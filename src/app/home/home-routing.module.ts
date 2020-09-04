import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { WalletsViewComponent } from './components/wallets-view/wallets-view.component';
import { HomePage } from './home.page';
import { EditTransactionDialogComponent } from './pages/edit-transaction-dialog/edit-transaction-dialog.component';
import { NewTransactionDialogComponent } from './pages/new-transaction-dialog/new-transaction-dialog.component';
import { SignInPage } from './pages/sign-in/sign-in.page';

const routes: Routes = [
  { path: 'sign-in', component: SignInPage },
  { path: 'new-transaction', component: NewTransactionDialogComponent, data: { animation: 'NewTransactionDialog' } },
  { path: 'edit-transaction', component: EditTransactionDialogComponent, data: { animation: 'EditTransactionDialog' } },
  {
    path: '',
    component: HomePage,
    // resolve: { data: UserResolver },
    canActivate: [AuthGuard],
    children: [
      { path: 'wallets', component: WalletsViewComponent },
      { path: '', component: DashboardViewComponent, data: { animation: 'HomePage' } },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
