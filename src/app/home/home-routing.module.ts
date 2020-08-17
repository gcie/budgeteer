import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then((m) => m.SignInPageModule),
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [AuthGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
