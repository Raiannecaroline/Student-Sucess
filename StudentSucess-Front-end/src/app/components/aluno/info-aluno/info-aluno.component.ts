import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/models/aluno';
import { Empresas } from 'src/app/models/empresa';
import { Formularios } from 'src/app/models/formularios';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-info-aluno',
  templateUrl: './info-aluno.component.html',
  styleUrls: ['./info-aluno.component.css']
})
export class InfoAlunoComponent implements OnInit {

  aluno: Aluno ={
    nome: '',
    cpf: '',
    email: '',
    cel: '',
    turma: '',
    dataContratacao: '',
    dataDesligamento: '',
    motivoDesligamento: '',
    parceiroNome: '',
    parceiroCnpj: '',
    parceiroNomeRepresentante: ''
  }

  displayedColumns: string[] = ['nome', 'email', 'curso', 'acoes'];
  // dataSource = new MatTableDataSource<Aluno>(this.aluno.empresas );

  displayedColumnsForms: string[] = ['nomeFormulario', 'acoes'];
  // dataSourceForms = new MatTableDataSource<Formularios>(this.aluno.formularios );
  
  constructor(
    private alunoService: AlunoService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.aluno.cpf = this.route.snapshot.paramMap.get('cpf') || ""
    this.preencherCampos(this.aluno.cpf)
    // this.aluno.empresas?.forEach(empresas =>{console.log(empresas.nome)})
    // this.crirarFormulario()
  
  }


  /**
  * Busca um aluno
  * @param cpf Busca os dados de um aluno de acordo com o seu cpf
  */
  preencherCampos(cpf:string){
    this.alunoService.buscarPorCPF(cpf).subscribe((buscado)=>{
      this.aluno = buscado
      // this.dataSource = new MatTableDataSource<Empresas>(this.aluno.empresas);
    })
  }

}
