import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() color: string;
  colorClass;

  ngOnInit() {
    this.colorClass = {
      'primary-dark': this.color === 'primary-dark' || this.color === 'dark',
      'primary-medium-dark': this.color === 'primary-medium-dark' || this.color === 'medium-dark',
      primary: this.color === 'primary' || this.color === 'default',
      'primary-medium-light': this.color === 'primary-medium-light' || this.color === 'medium-light',
      'primary-light': this.color === 'primary-light' || this.color === 'light',
      'primary-very-light': this.color === 'primary-very-light' || this.color === 'very-light',
      'secondary-dark': this.color === 'secondary-dark',
      'secondary-medium-dark': this.color === 'secondary-medium-dark',
      secondary: this.color === 'secondary',
      'secondary-medium-light': this.color === 'secondary-medium-light',
      'secondary-light': this.color === 'secondary-light',
      'secondary-very-light': this.color === 'secondary-very-light',
      'tertiary-dark': this.color === 'tertiary-dark',
      'tertiary-medium-dark': this.color === 'tertiary-medium-dark',
      tertiary: this.color === 'tertiary',
      'tertiary-medium-light': this.color === 'tertiary-medium-light',
      'tertiary-light': this.color === 'tertiary-light',
      'tertiary-very-light': this.color === 'tertiary-very-light',
    };
  }
}
