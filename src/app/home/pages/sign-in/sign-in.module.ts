import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignInPageRoutingModule } from './sign-in-routing.module';
import { SignInPage } from './sign-in.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, SignInPageRoutingModule],
  declarations: [SignInPage],
})
export class SignInPageModule {}
