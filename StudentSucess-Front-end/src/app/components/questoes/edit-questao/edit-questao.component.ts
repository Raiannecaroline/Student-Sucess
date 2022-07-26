import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivate } from 'src/app/models/canDeactivate';
import { Questoes } from 'src/app/models/questoes';
import { QuestoesService } from 'src/app/services/questoes.service';
import { ConfirmExitDialogComponent } from 'src/app/shared/confirm-exit-dialog/confirm-exit-dialog.component';

@Component({
  selector: 'app-edit-questao',
  templateUrl: './edit-questao.component.html',
  styleUrls: ['./edit-questao.component.css']
})
export class EditQuestaoComponent implements OnInit, CanDeactivate {

  formulario!:FormGroup

  tipoDaPergunta =["MULTIPLA_ESCOLHA", "ESCOLHA_SIMPLES"]


  questao: Questoes={
    id:0,
    enunciado: '',
    alternativas: [],
    tipoDePergunta: '',
    respostas: [],
    selecao: ''
  }
  
  constructor(
   private service:QuestoesService,
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
    this.questao.id = Number.parseInt(this.route.snapshot.paramMap.get('id') || "0")
    this.preencherCampos(this.questao.id)
    this.criarFormulario()
  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      enunciado: ['', [Validators.required,Validators.minLength(6)]]
    })
  }
  /**
   * 
   * @param id Edita a questao selecionada de acordo com o ID
   */
  editarQuestao(id:number){
    this.service.atualizarQuestao(this.questao).subscribe(()=>{
      this._snackBar.open('Questão editada com sucesso', 'OK',{duration: 3000});
      const id = this.questao.id 
      this.formulario.reset()
      this.router.navigate([`questoes/info-questao/${id}`])
    }, ex => {
    if(ex.error.errors) {
      ex.error.errors.forEach((element: { message: string | undefined; }) => {
        this._snackBar.open( element.message ||"Erro ao editar" , 'OK',{duration: 3000});
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
  * @param id Busca os dados de uma questao de acordo com com seu ID.
  */
  preencherCampos(id:number){
    this.service.buscarPorId(id).subscribe((buscado)=>{
      this.questao = buscado
    })
  }

  /**
   * 
   * @returns Verifica se os campos do Formulário estão válidos
   */
  validarCampos(): boolean {
    return this.formulario.valid
    console.log(this.validarCampos)
  }
  
  

}

