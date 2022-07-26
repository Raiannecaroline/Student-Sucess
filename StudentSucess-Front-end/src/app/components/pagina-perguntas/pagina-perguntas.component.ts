import { Respostas } from './../../models/respostas';
import { Formularios } from 'src/app/models/formularios';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestoesService } from 'src/app/services/questoes.service';
import { FormularioService } from 'src/app/services/formulario.service';

@Component({
  selector: 'app-pagina-perguntas',
  templateUrl: './pagina-perguntas.component.html',
  styleUrls: ['./pagina-perguntas.component.css']
})
export class PaginaPerguntasComponent implements OnInit {


  formulario!: FormGroup

  selectedRadio!: string

  arrayRespostas = []

  formularioResposta: Formularios ={
    nomeFormulario: '',
    questoes: [],
    destinatarioPergunta: '',
    periodoFormulario: '',
    turma: '',
    id: 0,
    email: ''
  }

  constructor(
    private formularioService: FormularioService,
    private questaoService: QuestoesService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.formularioResposta.id = Number.parseInt(this.route.snapshot.paramMap.get('id') || "0")
    this.buscarFormulario(this.formularioResposta.id)


  }


  buscarFormulario(id:number){
    this.formularioService.buscarPorId(id).subscribe((formBuscado)=>{
      this.formularioResposta = formBuscado
    })

 }


 gravarResposta(){

  for(var questao of this.formularioResposta.questoes){

    questao.respostas.push(questao.selecao)

    questao.selecao = ''
    this.questaoService.atualizarQuestao(questao).subscribe(()=> {console.log("realizado")})
  }

 }

 enviarFormulario(){

  this.formularioService.validar(this.formularioResposta).subscribe(()=>{

    this.gravarResposta()

    this.formularioService.atualizarFormulario(this.formularioResposta).subscribe(()=> {
      this.router.navigate(['/questionario-agradecimento'])
    // this.router.navigate(['questoes/nova-questao'])
   })

  },
  ex =>{
    this._snackBar.open(ex.error.developerMessage ||"Resposta com campos invalidos", 'OK',{duration: 5000});


  } )



}

}
