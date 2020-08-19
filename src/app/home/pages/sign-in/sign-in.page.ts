import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit, OnDestroy {
  redirectOnLogin$: Subscription;

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  ngOnInit() {
    this.redirectOnLogin$ = this.authService.currentUser$
      .pipe(
        filter((user) => user !== null),
        take(1)
      )
      .subscribe(this.redirectLoggedUserToProfilePage.bind(this));
  }

  ngOnDestroy() {
    this.redirectOnLogin$.unsubscribe();
  }

  googleSignIn() {
    this.authService.googleSignIn();
  }

  redirectLoggedUserToProfilePage() {
    this.ngZone.run(() => this.router.navigateByUrl('/home', { replaceUrl: true }));
  }
}
