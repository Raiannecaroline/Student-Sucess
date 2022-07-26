import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivate } from 'src/app/models/canDeactivate';
import { Formularios } from 'src/app/models/formularios';
import { Questoes } from 'src/app/models/questoes';
import { FormularioService } from 'src/app/services/formulario.service';
import { QuestoesService } from 'src/app/services/questoes.service';
import { ConfirmExitDialogComponent } from 'src/app/shared/confirm-exit-dialog/confirm-exit-dialog.component';

@Component({
  selector: 'app-novo-formulario',
  templateUrl: './novo-formulario.component.html',
  styleUrls: ['./novo-formulario.component.css']
})
export class NovoFormularioComponent implements OnInit, CanDeactivate {

  destinatarioPergunta = ["ALUNOS", "PARCEIROS"]
  periodoFormulario =["FORMULARIO_30_DIAS", "FORMULARIO_90_DIAS","FORMULARIO_180_DIAS","FORMULARIO_365_DIAS"]

  listaQuestoes: Questoes[] = []

  formulario!:FormGroup

  selecionarQuestoes!: FormGroup

  questao: Questoes = {
    enunciado: '',
    alternativas: [],
    tipoDePergunta: '',
    respostas: [],
    selecao: ''
  }

  formularios: Formularios ={
    nomeFormulario: '',
    questoes: [],
    destinatarioPergunta: '',
    periodoFormulario: '',
    turma: '',
    id: 0
  }

  constructor(
   private service:FormularioService,
   private formBuilder: FormBuilder,
   private router: Router,
   private dialog: MatDialog,
   private _snackBar: MatSnackBar,
   private questoesService: QuestoesService
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
    this.selectQuestoes()
    this.listarQuestoes()
  }

  crirarFormulario(){
    this.formulario = this.formBuilder.group({
      nomeFormulario:['', [Validators.required, Validators.minLength(3)]],
      questoes:[''],
      destinatarioPergunta:['',[Validators.required]],
      periodoFormulario:['',[Validators.required]],
      turma:['',[Validators.required]]
    })
  }
  
  selectQuestoes() {
    this.selecionarQuestoes = this.formBuilder.group({
      questao: [''],
    })
  }

  criarFormularioParaEnvio(){
    this.service.salvarFormulario(this.formularios).subscribe(()=>{
      this._snackBar.open('Formulario cadastrado com sucesso', 'OK',{duration: 3000});

      this.formulario.reset()
      this.router.navigate(['formulario/lista-formulario'])
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

  cadastrarQuestao(){
    if (this.questao.enunciado != '') {
    this.formularios.questoes.push(this.questao)
    this.selecionarQuestoes.reset()
    }
  }

  deletarQuestao(index: number, remove: number) {
    this.formularios.questoes.splice(index, remove)
  }
 
  /**
   * 
   * @returns Valida se os campos do Formulario estão válidos
   */
  validarCampos(): boolean {
    return this.formulario.valid
  }

  listarQuestoes() {
    this.questoesService.listarTodos().subscribe(
      (questoes) => {
        this.listaQuestoes = questoes
      }
    )
  }
}
