import { Component, OnInit, ViewChild } from '@angular/core';
import { Formularios } from 'src/app/models/formularios';
import { FormularioService } from 'src/app/services/formulario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list-formulario',
  templateUrl: './list-formulario.component.html',
  styleUrls: ['./list-formulario.component.css']
})
export class ListFormularioComponent implements OnInit {
  empresa: Formularios={
    nomeFormulario: '',
    questoes: [],
    destinatarioPergunta: '',
    periodoFormulario: '',
    turma: '',
    id: 0
  }
  ELEMENT_DATA: Formularios[] = []

  camposDaTurma: string[] = ["JAVA_FULL_STACK", "DESENVOLVEDOR_SALESFORCE", "ENGENHARIA_DE_DADOS", "MIDIA_DIGITAL"]


  displayedColumns: string[] = ['id', 'destinatarioPergunta', 'turma','periodoFormulario','acoes'];
  dataSource = new MatTableDataSource<Formularios>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any;

  constructor(
    private service: FormularioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Formularios>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }
  /**
   * 
   * @param event Filtro de pesquisa e informações do formulário
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * 
   * @param turma retorna a pesquisa de formulários por turma 
   */
  orderByTurma(turma: string): void{
    let list: Formularios[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.turma == turma)
        list.push(element)
    });
    this.dataSource = new MatTableDataSource<Formularios>(list);
    this.dataSource.paginator = this.paginator;
  }
}


