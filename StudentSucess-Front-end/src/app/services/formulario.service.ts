import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formularios } from '../models/formularios';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private readonly baseUrl = 'http://localhost:8080/formularios'

  constructor(private http: HttpClient) { }

  /**
   * Busca pelo id
   * @param id busca determinado formulário pelo seu id
   * @returns observable
   */
  buscarPorId(id: number): Observable<Formularios> {
    return this.http.get<Formularios>(`${this.baseUrl}/${id}`)
  }

  /**
   * Mostra todos os formulários
   * @returns observable
   */
  listarTodos(): Observable<Formularios[]> {
    return this.http.get<Formularios[]>(`${this.baseUrl}`)
  }

  /**
   * Salva um novo formulário
   * @param formulario Salva com as perguntas propostas no formulário
   * @returns observable
   */
  salvarFormulario(formulario: Formularios): Observable<Formularios> {
    return this.http.post<Formularios>(`${this.baseUrl}`, formulario)
  }

  validar(formulario: Formularios): Observable<Formularios> {
    return this.http.put<Formularios>(`${this.baseUrl}/validar/${formulario.id}`, formulario)
  }

  /**
   * Alterações no formulário
   * @param formulario Atualiza o formulário com as novas alterações
   * @returns observable
   */
  atualizarFormulario(formulario: Formularios): Observable<Formularios>{
    return this.http.put<Formularios>(`${this.baseUrl}/${formulario.id}`, formulario)
  }

  atFormulario(formulario: Formularios): Observable<Formularios>{
    return this.http.put<Formularios>(`${this.baseUrl}/atualizar/${formulario.id}`, formulario)
  }

  /**
   * Deleta o formulário
   * @param id Deleta um determinado formulário
   * @returns observable
   */
  deletarFormulario(id: number): Observable<Formularios> {
    return this.http.delete<Formularios>(`${this.baseUrl}/${id}`)
  }

  /**
   * Busca todos os formulários existentes
   * @returns observable
   */
  findAll(): Observable<Formularios[]> {
    return this.http.get<Formularios[]>(`${this.baseUrl}`);
  }
}
