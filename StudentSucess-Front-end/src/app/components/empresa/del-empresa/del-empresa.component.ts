import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empresas } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-del-empresa',
  templateUrl: './del-empresa.component.html',
  styleUrls: ['./del-empresa.component.css']
})
export class DelEmpresaComponent implements OnInit {

  empresa: Empresas={
    cnpj: '',
    email: '',
    nome: '',
    nomeRepresentante: ''
  }

  constructor(
   private empresaService:EmpresaService,
   private _snackBar: MatSnackBar,
   private router: Router,
   private route:ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.empresa.cnpj = this.route.snapshot.paramMap.get('cnpj') || ""
    this.preencherCampos(this.empresa.cnpj)
  }
  /**
   * 
   * @param cnpj Exclui uma empresa de acordo com com seu CNPJ.
   */
  deletarEmpresa(cnpj:string){
    this.empresaService.deletarEmpresa(this.empresa.cnpj).subscribe(()=>{
      this._snackBar.open('Empresa deletada com sucesso', 'OK',{duration: 3000});
      this.router.navigate(['/empresa/lista-empresa'])
    }, ex => {
    if(ex.error.errors) {
      ex.error.errors.forEach((element: { title: string | undefined; }) => {
        this._snackBar.open( element.title ||"" , 'OK',{duration: 3000});
      });

    } else {
      if(Number.parseInt(ex.error.status) == 403){
        this._snackBar.open("Acesso a essa operação negado, sem permissão.", 'OK',{duration: 3000});


      }else{
        this._snackBar.open(ex.error.title, 'OK',{duration: 3000});
      console.log(ex.error)

      }
    }
  })

 }

  /**
   * 
   * @param cnpj Busca os dados de uma empresa de acordo com com seu CNPJ.
   */
  preencherCampos(cnpj:string){
    this.empresaService.buscarPorCNPJ(cnpj).subscribe((buscado)=>{
      this.empresa = buscado
    })
  }

}
