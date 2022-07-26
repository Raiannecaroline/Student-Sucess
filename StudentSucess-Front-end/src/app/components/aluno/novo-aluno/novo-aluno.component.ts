import { EmpresaService } from 'src/app/services/empresa.service';
import { Aluno } from './../../../models/aluno';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empresas } from 'src/app/models/empresa';
import { CanDeactivate } from 'src/app/models/canDeactivate';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmExitDialogComponent } from 'src/app/shared/confirm-exit-dialog/confirm-exit-dialog.component';

@Component({
  selector: 'app-novo-aluno',
  templateUrl: './novo-aluno.component.html',
  styleUrls: ['./novo-aluno.component.css']
})
export class NovoAlunoComponent implements OnInit, CanDeactivate {

  formulario!: FormGroup

  listaDeEmpresas: Empresas[] = []

  camposDaTurma: string[] = ["JAVA_FULL_STACK", "DESENVOLVEDOR_SALESFORCE", "ENGENHARIA_DE_DADOS", "MIDIA_DIGITAL"]

  aluno: Aluno ={
    nome: '',
    cpf: '',
    email: '',
    cel: '',
    turma: '',
    dataContratacao: '',
    dataDesligamento: '',
    parceiroCnpj: '',
    motivoDesligamento: ''
  }

  constructor(
    private alunoService: AlunoService,
    private formBuilder: FormBuilder,
    private router:          Router,
    private _snackBar: MatSnackBar,
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
    this.buscarTodasEmpresas()
    this.criarFormulario()
  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      cel: ['', [Validators.required, Validators.minLength(3)]],
      turma:['', [Validators.required, Validators.minLength(3)]],
      dataContratacao: ['', [Validators.required]],
     // dataDesligamento: [''],
      parceiroCnpj: ['', [Validators.required]],
      motivoDesligamento: ['']
    })
  }


  criarAluno(){
   // console.log(this.aluno.parceiroCnpj)
    this.alunoService.salvarAluno(this.aluno).subscribe(()=>{
      this._snackBar.open('Aluno cadastrado com sucesso', 'Ok', {duration: 3000});
      this.formulario.reset()
      this.router.navigate(['aluno/lista-aluno'])
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
  validarCampos(): boolean {
    return this.formulario.valid
  }

}

