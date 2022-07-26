import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../models/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();
  private readonly baseUrl = 'http://localhost:8080/login'


  constructor(private http: HttpClient) { }

  /**
   * Autenticando
   * @param creds Precisa fazer um login para acessar o site
   * @returns o usuario que foi logado
   */
  authenticate(creds: Credenciais) {
    return this.http.post(`${this.baseUrl}`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  /**
   * Login
   * @param authToken Indica que seu login foi realizado com sucesso
   */
  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  /**
   * Logado
   * @returns Indica que ja esta logado
   */
  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }

  /**
   * Desloga da sua conta
   */
  logout() {
    localStorage.removeItem('token');
  }
}
