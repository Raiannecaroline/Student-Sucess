export interface Aluno {
  nome: string
  cpf: string
  email: string
  cel: string
  turma: string
  dataContratacao: string
  dataDesligamento?: string
  motivoDesligamento?: string
  parceiroNome?: string
  parceiroCnpj?: string
  parceiroNomeRepresentante?: string
  email_30_DiasEnviado?: boolean
  email_30_FormularioRespondido?: boolean
  email_90_DiasEnviado?: boolean
  email_90_FormularioRespondido?: boolean
  email_180_DiasEnviado?: boolean
  email_180_FormularioRespondido?: boolean
  email_365_DiasEnviado?: boolean
  email_365_FormularioRespondido?: boolean
}
