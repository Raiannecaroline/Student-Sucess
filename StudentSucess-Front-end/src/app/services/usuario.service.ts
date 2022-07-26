
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly baseUrl = 'http://localhost:8080/usuarios'

  constructor(private http: HttpClient) { }

  /**
   * Busca pela matrícula
   * @param matricula busca determinado usuário pela sua matrícula
   * @returns observable
   */
  buscarPorMatricula(matricula: string): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.baseUrl}/${matricula}`);
  }

  /**
   * Mostra todos os usuários
   * @returns observable
   */
  listarTodos(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.baseUrl}`)
  }

  /**
   * Salva um novo usuário
   * @param usuario Salva com as informações preenchidas no usuário
   * @returns observable
   */
  salvarUsuario(usuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.baseUrl}`, usuario)
  }

  /**
   * Alterações no usuário
   * @param usuario Atualiza o usuário com as novas alterações
   * @returns observable
   */
  atualizarUsuario(usuario: Usuarios): Observable<Usuarios>{
    return this.http.put<Usuarios>(`${this.baseUrl}/${usuario.matricula}`, usuario)
  }

  /**
   * Deleta o usuário
   * @param matricula Deleta um determinado usuário
   * @returns observable
   */
  deletarUsuario(matricula:string): Observable<Usuarios> {
    return this.http.delete<Usuarios>(`${this.baseUrl}/${matricula}`)
  }

  /**
   * Busca todos os usuários existentes
   * @returns observable
   */
  findAll(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.baseUrl}`);
  }

}
