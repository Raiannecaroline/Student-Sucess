import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';


@Component({
  selector: 'app-list-aluno',
  templateUrl: './list-aluno.component.html',
  styleUrls: ['./list-aluno.component.css']
})
export class ListAlunoComponent implements OnInit {

  ELEMENT_DATA: Aluno[] = []
  columns : String[] = ['nome', 'parceiro', 'dataContratacao', 'dataDesligamento', 'turma', 'actions']

  @ViewChild(MatPaginator) paginator: any;

  camposDaTurma: string[] = ["JAVA_FULL_STACK", "DESENVOLVEDOR_SALESFORCE", "ENGENHARIA_DE_DADOS", "MIDIA_DIGITAL"]
  dataSource = new MatTableDataSource<Aluno>(this.ELEMENT_DATA);

  constructor(
    private alunoService: AlunoService,
    ) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.alunoService.listarTodos().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Aluno>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  /**
   * Filtro do formulário
   * @param event Filtra as pesquisas e informações do formulário
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Orderna uma turma
   * @param turma puxa as turmas pela lista fixa
   */
  orderByTurma(turma: string): void{
    let list: Aluno[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.turma == turma )
        list.push(element)
    });
    this.dataSource = new MatTableDataSource<Aluno>(list);
    this.dataSource.paginator = this.paginator;
  }

}
