import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { database } from 'firebase';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public authService: AuthService, private router: Router, private menu: MenuController) {
    // this.authService.currentUser.displayName;
  }

  ngOnInit() {}

  test() {
    const db = database();
    const newKey = db.ref().child('wallets').push().key;
    db.ref('/wallets/' + newKey).set({
      id: newKey,
      owner: 'gxciesielski@gmail.com',
      transactions: [],
    });
  }

  openMenu() {
    this.menu.open('mainMenu');
  }

  redirect(route: string) {
    this.router.navigateByUrl(route);
  }
}
