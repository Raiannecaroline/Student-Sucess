import { Usuarios } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanDeactivate } from 'src/app/models/canDeactivate';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmExitDialogComponent } from 'src/app/shared/confirm-exit-dialog/confirm-exit-dialog.component';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit, CanDeactivate {

  formulario!: FormGroup
  matricula: string | undefined

 usuario: Usuarios = {

    matricula: '',
    emailSoulCode: '',
    nome: '',
    senha: '',
  }

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route:ActivatedRoute,
    private dialog: MatDialog
  ){}

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
    this.usuario.matricula = this.route.snapshot.paramMap.get('matricula') || ""
    this.preencherCampos(this.usuario.matricula)
    this.editForm()
  }

  /**
   * Metodo para trazer as informações que já estão salvas no nosso sistema de um usuario especifico,
   * permitindo também que o usuario da aplicação reescreva as informações já salvas, as editando
   * @return void
   */
  editForm(){
    this.formulario = this.formBuilder.group({
      nome:[this.usuario.nome,[Validators.required, Validators.minLength(3)]],
      emailSoulCode:[this.usuario.emailSoulCode],
      senha:[this.usuario.senha,[Validators.required, Validators.minLength(6)]]
    })
  }

  /**
   * Função para salvar os dados editados do usuario, chamando o metodo do servico de editar, e ainda, se tudo der certo:
   * .Mostra uma snackBar ao usuario informando uma mensagem de sucesso
   * .Reseta os campos de input
   *. Nevega o usuario até a página de listagem dos usuarios
   * Se der errado:
   * .Mostra mensagens de erro através do snackBar que variam de acordo com o tipo do erro
   * @param matricula
   */
  editarUsuario(matricula:string){
    this.usuarioService.atualizarUsuario(this.usuario).subscribe(()=>{
      this._snackBar.open('Usuário editado com sucesso', 'OK',{duration: 3000});;
      this.formulario.reset()
      this.matricula = undefined
      this.router.navigate([`usuario/info-usuario/${matricula}`])
    }, ex =>{
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
   * Método para preencher os campos do input com os dados de um usuario especifico já salvo na aplicação
   * @param matricula A matricula do usuario que queremos encontrar, é a partir dela
   * que conseguimos recuperar um usuario especifico
   * @return void
   */
  preencherCampos(matricula:string){
    this.usuarioService.buscarPorMatricula(this.usuario.matricula).subscribe((buscado)=>{
      this.usuario = buscado
      this.usuario.senha = ""
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
