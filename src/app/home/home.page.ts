import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public authService: AuthService, private router: Router, private menu: MenuController) {}

  ngOnInit() {
    // this.redirect('/wallets');
  }

  openMenu() {
    this.menu.open('mainMenu');
  }

  redirect(route: string) {
    this.menu.close('mainMenu');
    this.router.navigateByUrl(route);
  }

  logout() {
    this.authService.signOut();
  }
}
