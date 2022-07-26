import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-del-aluno',
  templateUrl: './del-aluno.component.html',
  styleUrls: ['./del-aluno.component.css']
})
export class DelAlunoComponent implements OnInit {

  aluno: Aluno ={
    nome: '',
    cpf: '',
    email: '',
    cel: '',
    turma: '',
    dataContratacao: '',
    dataDesligamento: '',
    parceiroCnpj: '',
    motivoDesligamento: ''
  }
  
  constructor(
    private alunoService: AlunoService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route:ActivatedRoute
  ) { }
    
  
  ngOnInit(): void {
    this.aluno.cpf = this.route.snapshot.paramMap.get('cpf') || ""
    this.preencherCampos(this.aluno.cpf)
  }
       
  /**
   * Deleta um aluno
   * @param cpf Exclui um aluno de acordo com seu Cpf.
   */
  deletarAluno(cpf:string){
       this.alunoService.deletarAluno(this.aluno.cpf).subscribe(()=>{
        this._snackBar.open('Aluno deletado com sucesso', 'OK',{duration: 3000});
        this.router.navigate(['/aluno/lista-aluno'])
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
   * Busca um aluno
   * @param cpf Busca os dados de um aluno de acordo com o seu cpf
   */
    preencherCampos(cpf:string){
      this.alunoService.buscarPorCPF(cpf).subscribe((buscado)=>{
        this.aluno = buscado
      })
    } 
}
