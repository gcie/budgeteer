import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { EditTransactionDialogComponent } from './components/edit-transaction-dialog/edit-transaction-dialog.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { MonthSummaryComponent } from './components/month-summary/month-summary.component';
import { NewTransactionDialogComponent } from './components/new-transaction-dialog/new-transaction-dialog.component';
import { WalletsViewComponent } from './components/wallets-view/wallets-view.component';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [
    HomePage,
    DashboardViewComponent,
    WalletsViewComponent,
    NewTransactionDialogComponent,
    EditTransactionDialogComponent,
    ExpenseListComponent,
    MonthSummaryComponent,
  ],
})
export class HomePageModule {}
