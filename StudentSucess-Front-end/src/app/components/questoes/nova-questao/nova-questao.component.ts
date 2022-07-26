import { Respostas } from './../../../models/respostas';
import { Router, UrlTree } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Questoes } from './../../../models/questoes';
import { Component, OnInit } from '@angular/core';
import { QuestoesService } from 'src/app/services/questoes.service';
import { CanDeactivate } from 'src/app/models/canDeactivate';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmExitDialogComponent } from 'src/app/shared/confirm-exit-dialog/confirm-exit-dialog.component';

@Component({
  selector: 'app-nova-questao',
  templateUrl: './nova-questao.component.html',
  styleUrls: ['./nova-questao.component.css']
})
export class NovaQuestaoComponent implements OnInit, CanDeactivate {

  formulario!: FormGroup

  formularioAlternativas!: FormGroup


  tipoDaPergunta =["MULTIPLA_ESCOLHA", "ESCOLHA_SIMPLES"]

  alternativa : string = ''

  novaQuestao: Questoes = {
    enunciado: '',
    alternativas: [],
    tipoDePergunta: '',
    respostas: [],
    selecao: ''
  }

  constructor(
    private questaoService: QuestoesService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
    ) { }

  canDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.formulario.dirty) {
      const ref = this.dialog.open(ConfirmExitDialogComponent)

      return ref.afterClosed()
    }

    return true
  }

  ngOnInit(): void {
    this.criarFormulario()
    this.formAlternativas()
  }



  criarFormulario(){

    this.formulario = this.formBuilder.group({
      enunciado: ['', [Validators.required,Validators.minLength(6)]],
    })
  }


  formAlternativas(){

    this.formularioAlternativas = this.formBuilder.group({
      alternativa: [''],
    })
  }



  criarQuestao(){

    if(this.formularioAlternativas.dirty){
      this.cadastrarAlternativa()
    }

    this.questaoService.salvarQuestao(this.novaQuestao).subscribe(()=> {
      this._snackBar.open('Questao cadastrado com sucesso', 'OK',{duration: 3000})
      this.formulario.reset()
      this.router.navigate(['questoes/lista-questao'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach((element: { message: string | undefined; }) => {
          this._snackBar.open( element.message ||"Resposta com campos invalidos" , 'OK',{duration: 3000});
        });

      } else {
        if(Number.parseInt(ex.error.status) == 403){
          this._snackBar.open("Acesso a essa operação negado, sem permissão.", 'OK',{duration: 3000});


        }else{
        this._snackBar.open(ex.error.message ||"Resposta com campos invalidos", 'OK',{duration: 3000});

        }
      }

    })

  }
   /**
   *
   * @returns Verifica se os campos do Formulário estão preenchidos para cadastrar
   */
  validarCampos(): boolean {
    return this.formulario.valid
  }


  cadastrarAlternativa(){
    if(this.alternativa != ''){
    this.novaQuestao.alternativas.push(this.alternativa)
    this.alternativa = ''
    }
  }
   /**
   *
   * @param index Busca a atividade pelo seu index
   * @param remove Remove a atividade de acordo com o index
   */
  deletarAtividade(index: number, remove: number): void{
    this.novaQuestao.alternativas?.splice(index, remove)

  }
  /**
   *
   * @param event Impede que o deletar seja feito pelo Keyup enter
   */
  prevent(event: any){
    event.preventDefault();
   }


}
