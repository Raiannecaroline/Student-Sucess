import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivate } from 'src/app/models/canDeactivate';
import { Formularios } from 'src/app/models/formularios';
import { Questoes } from 'src/app/models/questoes';
import { FormularioService } from 'src/app/services/formulario.service';
import { QuestoesService } from 'src/app/services/questoes.service';
import { ConfirmExitDialogComponent } from 'src/app/shared/confirm-exit-dialog/confirm-exit-dialog.component';

@Component({
  selector: 'app-edit-formulario',
  templateUrl: './edit-formulario.component.html',
  styleUrls: ['./edit-formulario.component.css']
})
export class EditFormularioComponent implements OnInit, CanDeactivate {

  destinatarioPergunta = ["ALUNOS", "PARCEIROS"]
    periodoFormulario =["FORMULARIO_30_DIAS", "FORMULARIO_90_DIAS","FORMULARIO_180_DIAS","FORMULARIO_365_DIAS"]

    listadeQuestoesForm : Questoes[] = []

    listaQuestoes: Questoes[] = []

    formulario!:FormGroup

    selecionarQuestoes!: FormGroup

    questao: Questoes = {
      enunciado: '',
      alternativas: [],
      tipoDePergunta: '',
      respostas: [],
      selecao: '',

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
     private questoesService: QuestoesService,
     private route: ActivatedRoute
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
      this.formularios.id = Number.parseInt(this.route.snapshot.paramMap.get('id') || "0")
      this.preencherCampos(this.formularios.id)
      this.criarFormulario()
      this.selectQuestoes()
      this.listarQuestoes()

    }


    criarFormulario(){
      this.formulario = this.formBuilder.group({
        nomeFormulario:[this.formularios.nomeFormulario,[Validators.required, Validators.minLength(3)]],
        questoes:[this.formularios.questoes],
        destinatarioPergunta:[this.formularios.destinatarioPergunta,[Validators.required]],
        periodoFormulario:[this.formularios.periodoFormulario,[Validators.required]],
        turma:[this.formularios.turma,[Validators.required]]
      })
    }

    selectQuestoes() {
      this.selecionarQuestoes = this.formBuilder.group({
        questao: [''],
      })
    }

    editFormulario() {
      this.formularios.questoes = this.listadeQuestoesForm
      this.service.atFormulario(this.formularios).subscribe(()=>{
        this._snackBar.open('Formulario atualizado com sucesso', 'OK',{duration: 3000});

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

    deletarQuestao(index: number, remove: number) {
      this.listadeQuestoesForm.splice(index, remove)
    }

    cadastrarQuestao(){
      if(this.questao.enunciado != '') {
      this.listadeQuestoesForm.push(this.questao)
      this.selecionarQuestoes.reset()
      }
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

    } preencherCampos(id: number){
        this.service.buscarPorId(id).subscribe((buscado)=>{
          this.formularios = buscado
          for (let i of this.formularios.questoes) {
            this.listadeQuestoesForm.push(i)
        }
        })


      }

}
