import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule],
  exports: [FlexLayoutModule, MaterialModule, IconComponent],
})
export class SharedModule {}
