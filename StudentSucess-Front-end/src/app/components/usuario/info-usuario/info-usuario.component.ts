import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuarios } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css']
})
export class InfoUsuarioComponent implements OnInit {

  
  formulario!:FormGroup
  matricula:string | undefined

  usuario: Usuarios={
    matricula: '',
    nome: '',
    emailSoulCode: '',
    senha: ''
  }

  
  
  constructor(
   private UsuarioService:UsuarioService,
   private formBuilder: FormBuilder,
  
   private route:ActivatedRoute,
  

  ) { }

  ngOnInit(): void {
    this.usuario.matricula = this.route.snapshot.paramMap.get('matricula') || ""
    this.preencherCampos(this.usuario.matricula)
    this.crirarFormulario()
  }

  /**
   * Metodo para trazer as informações que já estão salvas no nosso sistema de um usuario especifico
   * @return void
   */
  crirarFormulario(){
    this.formulario = this.formBuilder.group({
      nome:[this.usuario.nome,[Validators.required, Validators.minLength(3)]],
      matricula:[this.usuario.matricula,[Validators.required]],
      emailSoulCode:[this.usuario.emailSoulCode,[Validators.required,Validators.email, Validators.minLength(3)]],
      senha:[this.usuario.senha,[Validators.required]]
    })
  }
  

  /**
   * Método para preencher os campos do input com os dados de um usuario especifico já salvo na aplicação
   * @param matricula A matricula do usuario que queremos encontrar, é a partir dela
   * que conseguimos recuperar um usuario especifico
   * @return void
   */
  preencherCampos(matricula:string){
    this.UsuarioService.buscarPorMatricula(matricula).subscribe((buscado)=>{
      this.usuario = buscado
    })
  }



}
