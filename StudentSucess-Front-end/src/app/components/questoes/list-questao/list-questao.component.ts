import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Questoes } from 'src/app/models/questoes';
import { QuestoesService } from 'src/app/services/questoes.service';

@Component({
  selector: 'app-list-questao',
  templateUrl: './list-questao.component.html',
  styleUrls: ['./list-questao.component.css']
})
export class ListQuestaoComponent implements OnInit {
  questao: Questoes={
    id:0,
    enunciado:'',
    alternativas:[],
    tipoDePergunta: '',
    respostas: [],
    selecao: ''
  }
  ELEMENT_DATA: Questoes[] = []

  displayedColumns: string[] = ['id','enunciado','acoes'];
  dataSource = new MatTableDataSource<Questoes>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any;

  constructor(
    private service: QuestoesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Questoes>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }
  /**
   *
   * @param event Filtra a pesquisa retornando informações do formulário
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

