import { Aluno } from "./aluno";
import { Formularios } from "./formularios";

export interface Empresas{
    cnpj:string,
    email: string,
    nome:string,
    nomeRepresentante: string,
    alunos?: Aluno[],
    formularios?: Formularios[]
    email_30_DiasEnviadoParceiro?: boolean
    email_30_FormularioRespondidoParceiro?: boolean
    email_90_DiasEnviadoParceiro?: boolean
    email_90_FormularioRespondidoParceiro?: boolean
    email_180_DiasEnviadoParceiro?: boolean
    email_180_FormularioRespondidoParceiro?: boolean
    email_365_DiasEnviadoParceiro?: boolean
    email_365_FormularioRespondidoParceiro?: boolean
}
