import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value?: Date): string {
    return value?.toLocaleDateString();
  }
}
