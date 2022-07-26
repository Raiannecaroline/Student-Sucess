import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/models/aluno';
import { Empresas } from 'src/app/models/empresa';
import { Formularios } from 'src/app/models/formularios';
import { EmpresaService } from 'src/app/services/empresa.service';


@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.component.html',
  styleUrls: ['./info-empresa.component.css']
})
export class InfoEmpresaComponent implements OnInit {

  cnpj:string | undefined

  empresa: Empresas={
    cnpj: '',
    email: '',
    nome: '',
    nomeRepresentante: '',
    alunos: [],
    formularios: []

  }

  displayedColumns: string[] = ['nome', 'email', 'curso', 'acoes'];
  dataSource = new MatTableDataSource<Aluno>(this.empresa.alunos);

  displayedColumnsForms: string[] = ['nomeFormulario', 'acoes'];
  dataSourceForms = new MatTableDataSource<Formularios>(this.empresa.formularios);

  
  constructor(
   private empresaService:EmpresaService,
   private route:ActivatedRoute,
   
  

  ) { }

  ngOnInit(): void {
    this.empresa.cnpj = this.route.snapshot.paramMap.get('cnpj') || ""
    this.preencherCampos(this.empresa.cnpj)
    this.empresa.alunos?.forEach(alunos =>{console.log(alunos.nome)})
  
  }

  /**
   * 
   * @param cnpj Busca os dados de uma empresa de acordo com com seu CNPJ.
   */
  preencherCampos(cnpj:string){
    this.empresaService.buscarPorCNPJ(cnpj).subscribe((buscado)=>{
      this.empresa = buscado
      this.dataSource = new MatTableDataSource<Aluno>(this.empresa.alunos);
    })
  }


  

}
