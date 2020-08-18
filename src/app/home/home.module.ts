import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { WalletsViewComponent } from './components/wallets-view/wallets-view.component';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, SharedModule],
  declarations: [HomePage, DashboardViewComponent, WalletsViewComponent],
})
export class HomePageModule {}
