import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { MonthSummaryComponent } from './components/month-summary/month-summary.component';
import { WalletDeleteConfirmDialogComponent } from './components/wallet-delete-confirm-dialog/wallet-delete-confirm-dialog.component';
import { WalletEditDialogComponent } from './components/wallet-edit-dialog/wallet-edit-dialog.component';
import { WalletNewDialogComponent } from './components/wallet-new-dialog/wallet-new-dialog.component';
import { WalletsViewComponent } from './components/wallets-view/wallets-view.component';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { EditTransactionDialogComponent } from './pages/edit-transaction-dialog/edit-transaction-dialog.component';
import { NewTransactionDialogComponent } from './pages/new-transaction-dialog/new-transaction-dialog.component';
import { SignInPage } from './pages/sign-in/sign-in.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, SharedModule, ReactiveFormsModule],
  entryComponents: [WalletEditDialogComponent, WalletDeleteConfirmDialogComponent, WalletNewDialogComponent],
  declarations: [
    HomePage,
    SignInPage,
    DashboardViewComponent,
    WalletsViewComponent,
    NewTransactionDialogComponent,
    EditTransactionDialogComponent,
    WalletEditDialogComponent,
    WalletDeleteConfirmDialogComponent,
    WalletNewDialogComponent,
    ExpenseListComponent,
    MonthSummaryComponent,
  ],
})
export class HomePageModule {}
