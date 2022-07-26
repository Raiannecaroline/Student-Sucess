import { Questoes } from './../../models/questoes';
import { Component, OnInit } from '@angular/core';
import { QuestoesService } from 'src/app/services/questoes.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var google: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   dados: Questoes ={
    enunciado: '',
    alternativas: [],
    tipoDePergunta: '',
    respostas: [],
    selecao: ''
  }

  constructor(
    private questaoService: QuestoesService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.dados.id = Number.parseInt(this.route.snapshot.paramMap.get('id') || "0")
    this.iniciarDados(this.dados.id)
  }


  iniciarDados(id: number){
    this.questaoService.buscarPorId(id).subscribe(
  		dados => {
  			this.dados = dados;
  			this.init();
  		});
  }

  /**
   * Inicializa a API de gráficos com delay de 1 segundo,
   * o que permite a integração da API com o Angular.
   *
   * @return void
   */
  init(): void {
    if(typeof(google) !== 'undefined') {
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
      	google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  /**
   * Método chamado assim que a API de gráficos é inicializada.
   * Reponsável por chamar os métodos geradores dos gráficos.
   *
   * @return void
   */
  exibirGraficos(): void {
  	this.exibir3dPieChart();

  }


  /**
   * Exibe o gráfico Pie Chart em 3D.
   *
   * @return void
   */
  exibir3dPieChart(): void {
  	const el = document.getElementById('3d_pie_chart');
  	const chart = new google.visualization.PieChart(el);
	  const opcoes = this.obterOpcoes();

    opcoes['is3D'] = true;
    chart.draw(this.obterDataTable(), opcoes);
  }


  /**
   * Cria e retorna o objeto DataTable da API de gráficos,
   * responsável por definir os dados do gráfico.
   *
   * @return any
   */
  obterDataTable(): any {
  	const data = new google.visualization.DataTable();

    data.addColumn('string', this.dados.enunciado);
    data.addColumn('number', 'Quantidade');
    data.addRows(this.retornarDados(this.dados));

    return data;
  }

  /**
   * Retorna as opções do gráfico, que incluem o título
   * e tamanho do gráfico.
   *
   * @return any
   */
  obterOpcoes(): any {
  	return {
    	'title': `${this.dados.enunciado}`,
        'width': 400,
        'height': 300
    };
  }




  /**
   * Faz a contagem de quantas de tais questoes foram selecionadas.
   * @param alternativa A resposta da questao.
   * @param array A lista de respostas.
   * @returns A contagem de quantas alternativas estao na contagem.
   */
  contarIguais(alternativa: string, array: string[]):number{

     let contador: number = 0


      for(let resposta of array){

        if(alternativa == resposta){

          contador++
        }

      }
      return contador
    }


    /**
     * Função que converte dados para um formato legivel do Google Charts
     * @param questao Recebe uma questao para adicionar os seus dados num formato legivel a nossa api grafica
     * @returns Retorna os dados no formato aceito pelo charts
     */
    retornarDados(questao: Questoes){

      let dados = []

      for(let alternativa of questao.alternativas){

        let iguais = this.contarIguais(alternativa, questao.respostas)

        let opcao = [alternativa, iguais]

        dados.push(opcao)



      }

      return dados

    }




}


