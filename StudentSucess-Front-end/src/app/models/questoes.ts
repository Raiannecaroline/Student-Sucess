import { Respostas } from "./respostas";

export interface Questoes{
id?: number,
enunciado:string,
alternativas:string[],
tipoDePergunta: string,
respostas: string[],
selecao: string 

}
