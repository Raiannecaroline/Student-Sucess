import { Questoes } from "./questoes";

export interface Formularios{
    id: number,
    nomeFormulario: string,
    questoes: Questoes[],
    destinatarioPergunta: string,
    periodoFormulario: string,
    turma:string,
    email?: string

  }
