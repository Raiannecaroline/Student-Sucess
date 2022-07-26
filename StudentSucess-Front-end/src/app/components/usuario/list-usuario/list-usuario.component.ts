import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuarios } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  usuario: Usuarios={
    matricula: '',
    emailSoulCode: '',
    nome: '',
    senha: ''
  }
  ELEMENT_DATA: Usuarios[] = []

  displayedColumns: string[] = ['nome', 'matricula', 'emailSoulCode','senha','acoes'];
  dataSource = new MatTableDataSource<Usuarios>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any;

  constructor(
    private service: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAll();
    console.log(this.ELEMENT_DATA[0])
  }

  /**
   * Método que busca todos os usuarios cadastrados no sistema, com o objetivo de mostrar eles na lista 
   * e ainda inicializa o paginator (contador de páginas da lista)
   * 
   * @return void
   */

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Usuarios>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  /** 
   * Método que inicializa o filtro da página 
   * 
   * @return void
  */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
