import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Questoes } from 'src/app/models/questoes';
import { QuestoesService } from 'src/app/services/questoes.service';

@Component({
  selector: 'app-info-questao',
  templateUrl: './info-questao.component.html',
  styleUrls: ['./info-questao.component.css']
})
export class InfoQuestaoComponent implements OnInit  {

  
  id:number | undefined

  questao: Questoes={
    id:0,
    enunciado: '',
    alternativas: [],
    tipoDePergunta: '',
    respostas: [],
    selecao:''
  }

  
  constructor(
   private service:QuestoesService,
   private route:ActivatedRoute
   
  

  ) { }

  ngOnInit(): void {
    this.questao.id = Number.parseInt(this.route.snapshot.paramMap.get('id') || "0")
    this.preencherCampos(this.questao.id)
  
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


  

}
