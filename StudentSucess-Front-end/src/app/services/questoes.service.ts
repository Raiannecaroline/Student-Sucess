import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questoes } from '../models/questoes';

@Injectable({
  providedIn: 'root'
})
export class QuestoesService {

  private readonly baseUrl = 'http://localhost:8080/questoes'

  constructor(private http: HttpClient) { }

  /**
   * Busca pelo id
   * @param id busca determinada questão pelo seu id
   * @returns observable
   */
  buscarPorId(id: number): Observable<Questoes> {
    return this.http.get<Questoes>(`${this.baseUrl}/${id}`);
  }

  /**
   * Mostra todas as questões
   * @returns observable
   */
  listarTodos(): Observable<Questoes[]> {
    return this.http.get<Questoes[]>(`${this.baseUrl}`)
  }

  /**
   * Salva uma nova questão
   * @param questoes Salva com as informações preenchidas na questão
   * @returns observable
   */
  salvarQuestao(questoes: Questoes): Observable<Questoes> {
    return this.http.post<Questoes>(`${this.baseUrl}`, questoes)
  }

  /**
   * Alterações nas questões
   * @param questoes Atualiza as questões com as novas alterações
   * @returns observable
   */
  atualizarQuestao(questoes: Questoes): Observable<Questoes>{
    return this.http.put<Questoes>(`${this.baseUrl}/${questoes.id}`,questoes)
  }

  /**
   * Deleta a questão
   * @param id Deleta uma determinada questão
   * @returns observable
   */
  deletarQuestao(id: number): Observable<Questoes> {
    return this.http.delete<Questoes>(`${this.baseUrl}/${id}`)
  }

  /**
   * Busca todas as questões existentes
   * @returns observable
   */
  findAll(): Observable<Questoes[]> {
    return this.http.get<Questoes[]>(`${this.baseUrl}`);
  }
}
