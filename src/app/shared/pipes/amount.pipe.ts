import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount',
})
export class AmountPipe implements PipeTransform {
  transform(value?: number): string {
    return value ? value.toFixed(2) + ' zł' : '0.00 zł';
  }
}
