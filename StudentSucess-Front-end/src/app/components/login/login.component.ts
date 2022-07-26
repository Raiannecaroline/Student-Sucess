import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    matricula: '123456',
    senha: '123456'
  }

  matricula = new FormControl("123456", Validators.required);
  senha = new FormControl("123456", Validators.minLength(3));


  constructor(
    private service: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,

    ) { }

  ngOnInit(): void { }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      this.service.successfulLogin((resposta.headers.get('Authorization') || "").substring(7));
      this.router.navigate(['home'])

    }, ex =>{
      this._snackBar.open( ex.error ||"Resposta com campos invalidos" , 'OK',{duration: 5000});

    })
  }
  /**
   *
   * @returns Valida se os campos do Formulario estão válidos
   */
  validaCampos(): boolean {
    return this.matricula.valid && this.senha.valid
  }

}
