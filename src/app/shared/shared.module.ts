import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { IconComponent } from './components/icon/icon.component';
import { AmountPipe } from './pipes/amount.pipe';
import { CategoryPipe } from './pipes/category.pipe';
import { DatePipe } from './pipes/date.pipe';

@NgModule({
  declarations: [IconComponent, CategoryPipe, DatePipe, AmountPipe],
  imports: [CommonModule, FlexLayoutModule, MaterialModule],
  exports: [FlexLayoutModule, MaterialModule, IconComponent, CategoryPipe, DatePipe, AmountPipe],
})
export class SharedModule {}
