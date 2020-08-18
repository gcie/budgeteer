import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { WalletsViewComponent } from './components/wallets-view/wallets-view.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then((m) => m.SignInPageModule),
  },
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuard],
    children: [
      { path: 'wallets', component: WalletsViewComponent },
      { path: '', component: DashboardViewComponent },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
