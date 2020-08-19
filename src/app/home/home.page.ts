import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../core/services/auth.service';

export const slideInAnimation = trigger('routeAnimations', [
  transition('HomePage => NewTransactionDialog, HomePage => EditTransactionDialog', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }),
    ]),
    query(':enter', [style({ top: '100%' })]),
    query(':enter', [animate('300ms ease-out', style({ top: '0%' }))]),
    query(':enter', animateChild()),
  ]),
  transition('NewTransactionDialog => HomePage, EditTransactionDialog => HomePage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }),
    ]),
    query(':leave', [animate('300ms ease-out', style({ top: '100%' }))]),
    query(':leave', animateChild()),
  ]),
]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [slideInAnimation],
})
export class HomePage implements OnInit {
  constructor(public authService: AuthService, private router: Router, private menu: MenuController) {}

  ngOnInit() {
    // this.redirect('/wallets');
  }

  openMenu() {
    this.menu.open('mainMenu');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  redirect(route: string) {
    this.menu.close('mainMenu');
    this.router.navigateByUrl(route);
  }

  logout() {
    this.authService.signOut();
  }
}
