import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { Empresas } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CanDeactivate } from 'src/app/models/canDeactivate';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmExitDialogComponent } from 'src/app/shared/confirm-exit-dialog/confirm-exit-dialog.component';

@Component({
  selector: 'app-nova-empresa',
  templateUrl: './nova-empresa.component.html',
  styleUrls: ['./nova-empresa.component.css']
})
export class NovaEmpresaComponent implements OnInit, CanDeactivate {

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
   private router: Router,
   private dialog: MatDialog,
   private _snackBar: MatSnackBar
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
    this.crirarFormulario()
  }

  crirarFormulario(){
    this.formulario = this.formBuilder.group({
      nome:['', [Validators.required, Validators.minLength(3)]],
      cnpj:['',[Validators.required]],
      email:['',[Validators.required, Validators.minLength(3)]],
      nomeRepresentante:['',[Validators.required, Validators.minLength(3)]]
    })
  }

  criarEmpresa(){
    this.empresaService.salvarEmpresa(this.empresa).subscribe(()=>{
      this._snackBar.open('Empresa cadastrado com sucesso', 'OK',{duration: 3000});

      this.formulario.reset()
      this.router.navigate(['empresa/lista-empresa'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach((element: { message: string | undefined; }) => {
          this._snackBar.open(element.message || "campos invalidos", 'OK',{duration: 3000});

        });

      } else {
        if(Number.parseInt(ex.error.status) == 403){
          this._snackBar.open("Acesso a essa operação negado, sem permissão.", 'OK',{duration: 3000});



        }else{
        this._snackBar.open(ex.error.message || "Campos invalidos", 'OK',{duration: 3000});


        }
      }

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
