import { Aluno } from './../../../models/aluno';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Empresas } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CanDeactivate } from 'src/app/models/canDeactivate';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmExitDialogComponent } from 'src/app/shared/confirm-exit-dialog/confirm-exit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlunoService } from 'src/app/services/aluno.service';
import { MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-edit-aluno',
  templateUrl: './edit-aluno.component.html',
  styleUrls: ['./edit-aluno.component.css']

})
export class EditAlunoComponent implements OnInit, CanDeactivate {

formulario!:FormGroup

listaDeEmpresas: Empresas[] = []

  aluno: Aluno ={
    nome: '',
    cpf: '',
    email: '',
    cel: '',
    turma: '',
    dataContratacao: '',
    dataDesligamento: '',
    parceiroCnpj: '',
    parceiroNome: '',
    motivoDesligamento: ''
  }

  constructor(
   private alunoService: AlunoService,
   private formBuilder: FormBuilder,
   private _snackBar: MatSnackBar,
   private router: Router,
   private route:ActivatedRoute,
   private dialog: MatDialog,
   private empresaService: EmpresaService
  ) { }

  /**
   * Impede o usuário de prosseguir se os campos não estiverem todos preenchidos
   * @returns boolean
   */
canDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.formulario.dirty) {
     const ref = this.dialog.open(ConfirmExitDialogComponent)

     return ref.afterClosed()
    }

    return true
}

  ngOnInit(): void {
    this.aluno.cpf = this.route.snapshot.paramMap.get('cpf') || ""
    this.preencherCampos(this.aluno.cpf)
    this.criarFormulario()
    this.buscarTodasEmpresas()
  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      nome: [this.aluno.nome, [Validators.required, Validators.minLength(3)]],
      email:[this.aluno.email, [Validators.email]],
      cel: [this.aluno.cel, [Validators.required]],
      parceiroCnpj: ['', [Validators.required]],
      dataDesligamento: [''],
      motivoDesligamento: [this.aluno.motivoDesligamento]
    })
  }

  /**
   * 
   * @param cpf Edita o aluno de acordo com o cpf selecionado
   */
  editarAluno(){
    this.alunoService.atualizarAluno(this.aluno).subscribe(()=>{
      this._snackBar.open('Aluno atualizado com sucesso', 'OK',{duration: 3000});
      const cpf = this.aluno.cpf
      this.formulario.reset()
      this.router.navigate([`aluno/info-aluno/${cpf}`])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.fields.forEach((element: { title: string | undefined; }) => {
          this._snackBar.open( element.title ||"Dados invalidos" , 'OK',{duration: 3000});
        });

      } else {
        if(Number.parseInt(ex.error.status) == 403){
          this._snackBar.open("Acesso a essa operação negado, sem permissão.", 'OK',{duration: 3000});



        }else{
        this._snackBar.open(ex.error.title || "Dados invalidos", 'OK',{duration: 3000});

        ex.error.fields.forEach((element: { userMesage: string | undefined; }) => {
          this._snackBar.open( element.userMesage ||"Dados invalidos" , 'OK',{duration: 3000});
        });
        }
      }

    })

 }

 /**
  * Busca um aluno
  * @param cpf Busca os dados de um aluno de acordo com o seu cpf
  */
  preencherCampos(cpf:string){
    this.alunoService.buscarPorCPF(this.aluno.cpf).subscribe((buscado)=>{
      this.aluno = buscado
    })
  }

  /**
   * Ele puxa todas as empresas cadastradas
   */
  buscarTodasEmpresas(){
    this.empresaService.listarTodos().subscribe((lista) =>
    {
      this.listaDeEmpresas = lista
    }
    )
  }

  /**
   * Verifica se os campos estão preenchidos para cadastrar
   * @returns boolean
   */
  validarCampos(): boolean  {
    return this.formulario.valid
  }
}
