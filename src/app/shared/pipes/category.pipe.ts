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
    transport: 'Transport',
    gifts: 'Prezenty',
    travel: 'Podróże',
    other: 'Inne',
    salary: 'Pensja',
    donation: 'Darowizna',
  };

  categoryToIcon = {
    food: 'food-apple-outline',
    clothes: 'tshirt-crew-outline',
    equipment: 'desk-lamp',
    entertainment: 'drama-masks',
    bills: 'receipt',
    transport: 'train-car',
    gifts: 'gift-outline',
    travel: 'airplane',
    other: 'dots-horizontal',
    salary: 'cash-usd-outline',
    donation: 'wallet-giftcard',
  };

  transform(value?: string, mode?: string): string {
    let map;
    switch (mode) {
      case 'icon':
        map = this.categoryToIcon;
        break;
      case 'translate':
      default:
        map = this.categoryToWord;
    }
    if (Object.keys(map).includes(value)) {
      return map[value];
    }
    return '';
  }
}
