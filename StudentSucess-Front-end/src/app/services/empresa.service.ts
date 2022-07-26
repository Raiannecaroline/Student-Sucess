import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresas } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private readonly baseUrl = 'http://localhost:8080/parceiros'

  constructor(private http: HttpClient) { }

  /**
   * Busca pela cnpj
   * @param cnpj busca determinada empresa pela sua cnpj
   * @returns observable
   */
  buscarPorCNPJ(cnpj: string): Observable<Empresas> {
    return this.http.get<Empresas>(`${this.baseUrl}/${cnpj}`);
  }

  /**
   * Mostra todas as empresas
   * @returns observable
   */
  listarTodos(): Observable<Empresas[]> {
    return this.http.get<Empresas[]>(`${this.baseUrl}`)
  }

  /**
   * Salva uma nova empresa
   * @param parceiro Salva com as informações preenchidas da empresa
   * @returns observable
   */
  salvarEmpresa(parceiro: Empresas): Observable<Empresas> {
    return this.http.post<Empresas>(`${this.baseUrl}`, parceiro)
  }

  /**
   * Alterações na empresa
   * @param parceiro Atualiza a empresa com as novas alterações
   * @returns observable
   */
  atualizarEmpresa(parceiro: Empresas): Observable<Empresas>{
    return this.http.put<Empresas>(`${this.baseUrl}/${parceiro.cnpj}`,parceiro)
  }

  /**
   * Deleta a empresa
   * @param cnpj Deleta uma determinada empresa
   * @returns observable
   */
  deletarEmpresa(cnpj:string): Observable<Empresas> {
    return this.http.delete<Empresas>(`${this.baseUrl}/${cnpj}`)
  }

  /**
   * Busca todas as empresas existentes
   * @returns observable
   */
  findAll(): Observable<Empresas[]> {
    return this.http.get<Empresas[]>(`${this.baseUrl}`);
  }
}
