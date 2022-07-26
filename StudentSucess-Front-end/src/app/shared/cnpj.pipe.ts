import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpj'
})
export class CnpjPipe implements PipeTransform {

  /**
   * Filtro de cnpj com pipe
   * @param value Recebe o valor e o formata em cnpj
   * @returns string
   */

  transform(value: string|number): string {

    let valor = value + ''

    valor = valor
    .padStart(14,'0')
    .substring(0,14)
    .replace(/[^0-9]/, '')
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')

    return valor
  }

}
