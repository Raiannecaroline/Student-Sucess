import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  /**
   * Filtro de telefone com pipe
   * @param value Recebe o valor e o formata em número de telefone
   * @returns string
   */
  transform(phoneValue: number | string): string {
      
    const stringPhone = phoneValue + '';
    const phoneNumber = parsePhoneNumber(stringPhone, 'BR');
    const formatted = phoneNumber.formatNational();
    return formatted;
  }
}