import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private readonly baseUrl = 'http://localhost:8080/alunos'

  constructor(private http: HttpClient) { }

  /**
   * Busca pelo cpf
   * @param cpf busca determinado aluno pelo seu cpf
   * @returns observable
   */
  buscarPorCPF(cpf: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.baseUrl}/${cpf}`);
  }

  /**
   * Mostra todos os alunos
   * @returns observable
   */
  listarTodos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.baseUrl}`)
  }

  /**
   * Salva um novo aluno
   * @param aluno Salva com as informações preenchidas do aluno
   * @returns observable
   */
  salvarAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(`${this.baseUrl}`, aluno)
  }

  /**
   * Alterações no aluno
   * @param aluno Atualiza o aluno com as novas alterações
   * @returns observable
   */
  atualizarAluno(aluno: Aluno): Observable<Aluno>{
    return this.http.put<Aluno>(`${this.baseUrl}/${aluno.cpf}`, aluno)
  }

  /**
   * Deleta o aluno
   * @param cpf Deleta um determinado aluno
   * @returns observable
   */
  deletarAluno(cpf: any): Observable<Aluno> {
    return this.http.delete<Aluno>(`${this.baseUrl}/${cpf}`)
  }

}
