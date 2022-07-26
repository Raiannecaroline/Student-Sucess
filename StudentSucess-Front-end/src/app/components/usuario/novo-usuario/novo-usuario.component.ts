import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router, UrlTree } from '@angular/router';
import { CanDeactivate } from 'src/app/models/canDeactivate';
import { Usuarios } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ConfirmExitDialogComponent } from 'src/app/shared/confirm-exit-dialog/confirm-exit-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit, CanDeactivate {

  formulario!: FormGroup

  usuario: Usuarios ={
  matricula:'',
  nome: '',
  emailSoulCode: '',
  senha:''
}

constructor(
  private usuarioService: UsuarioService,
  private formBuilder: FormBuilder,
  private _snackBar: MatSnackBar,
  private router: Router,
  private dialog: MatDialog

  ) { }

  /**
   * Metodo do guard para evitar que o usuario perca os dados que digitou no
   * input saindo da pagina sem antes ter enviado o formulario
   * @return boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree
   */
  canDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.formulario.dirty) {
      const ref = this.dialog.open(ConfirmExitDialogComponent)

      return ref.afterClosed()
    }

    return true
  }

ngOnInit(): void {
  this.criarFormulario()
}

/**
 * Método para a criação do formulário, onde vai receber as respostas dos usuarios
 * e ainda validar essas respostas
 *
 * @return void
 */
criarFormulario(){

  this.formulario = this.formBuilder.group({
    matricula: ['', [Validators.required,Validators.minLength(6)]],
    nome: ['', [Validators.required, Validators.minLength(3)]],
    emailSoulCode:['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  })
}

/**
 * Método para a criação de um usuario onde se tudo der certo:
 * .Mostra uma snackBar ao usuario informando uma mensagem de sucesso
 * .Reseta os campos de input
 *. Nevega o usuario até a página de listagem dos usuarios
 * Se der errado:
 * .Mostra mensagens de erro através do snackBar que variam de acordo com o tipo do erro
 * @return void
 */
criarUsuario(){

  this.usuarioService.salvarUsuario(this.usuario).subscribe(()=> {
    this._snackBar.open('Usuario cadastrado com sucesso', 'OK',{duration: 3000})
    this.formulario.reset()
    this.router.navigate(['usuario/lista-usuario'])
  }, ex => {
    if(ex.error.errors) {
      ex.error.errors.forEach((element: { message: string | undefined; }) => {
        this._snackBar.open( element.message ||"Resposta com campos invalidos" , 'OK',{duration: 3000});
      });

    } else {
      if(Number.parseInt(ex.error.status) == 403){
        this._snackBar.open("Acesso a essa operação negado, sem permissão.", 'OK',{duration: 3000});


      }else{
      this._snackBar.open(ex.error.developerMessage ||"Resposta com campos invalidos", 'OK',{duration: 6000});

      }
    }

  })

}

 /**
   * Função para validar os campos do formulário
   * @return Retorna um boolean que vai permitir que o botão fique funcional
   * caso todos os campos estejam válidos
   */
  validarCampos(): boolean {
  return this.formulario.valid
  }


}
