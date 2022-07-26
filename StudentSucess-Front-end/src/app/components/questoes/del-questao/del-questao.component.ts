import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Questoes } from 'src/app/models/questoes';
import { QuestoesService } from 'src/app/services/questoes.service';

@Component({
  selector: 'app-del-questao',
  templateUrl: './del-questao.component.html',
  styleUrls: ['./del-questao.component.css']
})
export class DelQuestaoComponent implements OnInit {

  questao: Questoes={
    id:0,
    enunciado: '',
    alternativas: [],
    tipoDePergunta: '',
    respostas: [],
    selecao: ''
  }
 
  constructor(

    private service: QuestoesService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
    
    ) { }
    
    ngOnInit(): void {
    this.questao.id = Number.parseInt(this.route.snapshot.paramMap.get('id') || "0")
    this.preencherCampos(this.questao.id)
    }
    /**
     * 
     * @param id Exclui a questao pelo ID
     */
    deletarQuestao(id:number) {
    this.service.deletarQuestao(this.questao.id||0).subscribe(()=>{
    this._snackBar.open('Questão apagada com sucesso', 'OK',{duration: 3000});
    this.router.navigate(['questoes/lista-questao'])
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
     * @param id Busca os dados de uma questao de acordo com com seu ID.
     */
    preencherCampos(id: number){
    this.service. buscarPorId(id).subscribe((buscado)=>{
    this.questao = buscado
    })
    } 
    
  } 
    