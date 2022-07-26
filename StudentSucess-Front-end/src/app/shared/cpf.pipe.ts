import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  /**
   * Filtro de cpf com pipe
   * @param value Recebe o valor e o formata em cpf
   * @returns string
   */
  transform(value: string|number): string {

    let valor = value + '';
    
    valor = valor
    .padStart(11, '0')
    .substring(0,11)
    .replace(/[^0-9]/, '')
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

    return valor
  }

}
