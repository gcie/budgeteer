import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../material.module';
import { CardComponent } from './components/card/card.component';
import { IconComponent } from './components/icon/icon.component';
import { AmountPipe } from './pipes/amount.pipe';
import { CategoryPipe } from './pipes/category.pipe';
import { DatePipe } from './pipes/date.pipe';

@NgModule({
  declarations: [IconComponent, CardComponent, CategoryPipe, DatePipe, AmountPipe],
  imports: [CommonModule, ChartsModule, FlexLayoutModule, MaterialModule],
  exports: [FlexLayoutModule, ChartsModule, MaterialModule, IconComponent, CardComponent, CategoryPipe, DatePipe, AmountPipe],
})
export class SharedModule {}
