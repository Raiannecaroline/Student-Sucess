import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Empresas } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CanDeactivate } from 'src/app/models/canDeactivate';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmExitDialogComponent } from 'src/app/shared/confirm-exit-dialog/confirm-exit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrls: ['./edit-empresa.component.css']
})
export class EditEmpresaComponent implements OnInit, CanDeactivate {

  formulario!:FormGroup

  empresa: Empresas={
    cnpj: '',
    email: '',
    nome: '',
    nomeRepresentante: ''
  }
  
  constructor(
   private empresaService:EmpresaService,
   private formBuilder: FormBuilder,
   private _snackBar: MatSnackBar,
   private router: Router,
   private route:ActivatedRoute,
   private dialog: MatDialog
    
  ) { }

  /**
   * 
   * @returns Confirma se o usario quer ir para outra rota
   * sem ter salvo os dados.
   */
  canDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.formulario.dirty) {
      const ref = this.dialog.open(ConfirmExitDialogComponent)

      return ref.afterClosed()
    }

    return true
  }

  ngOnInit(): void {
    this.empresa.cnpj = this.route.snapshot.paramMap.get('cnpj') || ""
    this.preencherCampos(this.empresa.cnpj)
    this.crirarFormulario()
  }

  crirarFormulario(){
    this.formulario = this.formBuilder.group({
      nome:[this.empresa.nome,[Validators.required, Validators.minLength(3)]],
      email:[this.empresa.email,[Validators.required,Validators.email, Validators.minLength(3)]],
      nomeRepresentante:[this.empresa.nomeRepresentante,[Validators.required]]
    })
  }

  /**
   * 
   * @param cnpj Edita a empresa de acordo com o CNPJ selecionado
   */
  editarEmpresa(cnpj:string){
    this.empresaService.atualizarEmpresa(this.empresa).subscribe(()=>{
      this._snackBar.open('Empresa cadastrada com sucesso', 'OK',{duration: 3000});
      const cnpj = this.empresa.cnpj 
      this.formulario.reset()
      this.router.navigate([`empresa/info-empresa/${cnpj}`])
    }, ex => {
    if(ex.error.errors) {
      ex.error.errors.forEach((element: { message: string | undefined; }) => {
        this._snackBar.open( element.message ||"" , 'OK',{duration: 3000});
        console.log(element.message)
      });

    } else {
      if(Number.parseInt(ex.error.status) == 403){
        this._snackBar.open("Acesso a essa operação negado, sem permissão.", 'OK',{duration: 3000});


      }else{
        this._snackBar.open(ex.error.message, 'OK',{duration: 3000});
      console.log(ex.error.message)

      }
    }
  })

 }

  /**
   * 
   * @param cnpj Busca os dados de uma empresa de acordo com com seu CNPJ.
   */
  preencherCampos(cnpj:string){
    this.empresaService.buscarPorCNPJ(cnpj).subscribe((buscado)=>{
      this.empresa = buscado
    })
  }

  /**
   * 
   * @returns Valida se os campos do Formulario estão válidos
   */
  validarCampos(): boolean {
    return this.formulario.valid
  }
  

}
