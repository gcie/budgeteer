import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  categoryToWord = {
    food: 'Jedzenie',
    clothes: 'Ubrania',
    equipment: 'Sprzęty',
    entertainment: 'Rozrywka',
    bills: 'Rachunki',
    transport: ' Transport',
    gifts: 'Prezenty',
    travel: 'Podróże',
    other: 'Inne',
    salary: 'Pensja',
    donation: 'Darowizna',
  };

  transform(value?: string): string {
    if (Object.keys(this.categoryToWord).includes(value)) {
      return this.categoryToWord[value];
    }
    return '';
  }
}
