import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuarios } from 'src/app/models/usuario';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-del-usuario',
  templateUrl: './del-usuario.component.html',
  styleUrls: ['./del-usuario.component.css']
})
export class DelUsuarioComponent implements OnInit {
 
  usuario: Usuarios={
    matricula: '',
    emailSoulCode: '',
    nome: '',
    senha: ''
  }

  constructor(
    private service: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.usuario.matricula = this.route.snapshot.paramMap.get('matricula') || ""
    this.Deletar(this.usuario.matricula)
  }


  /**
   * Função para deleção de um usuario especifico da aplicação onde se tudo der certo:
   * .Mostra uma snackBar ao usuario informando uma mensagem de sucesso
   *. Nevega o usuario até a página de listagem dos usuarios
   * Se der errado:
   * .Mostra mensagens de erro através do snackBar que variam de acordo com o tipo do erro
   * @param matricula a matricula do usuario que desejamos deletar, e a traves dela que conseguimos recuprar um usuario especifico
   * @return void
   */
  deletarUsuario(matricula:string){
    this.service.deletarUsuario(this.usuario.matricula).subscribe(()=>{
      this._snackBar.open('Usuário deletado com sucesso', 'OK',{duration: 3000});
      this.router.navigate(['/usuario/lista-usuario'])
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
  * Função para buscar um usuario usuario especifico atraves de seu numero de matricula, 
  * trazendo os seus dados para os campos do input 
  * @param matricula Parametro necessario para encontrar um usuario especifico na nossa aplicação
  */
 Deletar(matricula:string){
  this.service.buscarPorMatricula(matricula).subscribe((buscado)=>{
    this.usuario = buscado
  })
}


}

