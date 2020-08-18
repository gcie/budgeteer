import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { cfaSignIn, cfaSignOut, mapUserToUserInfo } from 'capacitor-firebase-auth';
import { auth, UserInfo } from 'firebase';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$: BehaviorSubject<UserInfo> = new BehaviorSubject(null);

  constructor(private router: Router) {
    auth().onAuthStateChanged((authState) => {
      mapUserToUserInfo()(of(authState)).subscribe((user: UserInfo) => {
        this.currentUser = user;
        console.log('[authStateChanged] user:');
        console.log(user);
      });
    });
  }

  public googleSignIn() {
    if (auth().currentUser) {
      this.currentUser = auth().currentUser;
    }
    cfaSignIn('google.com')
      .pipe(
        mapUserToUserInfo(),
        tap((user: UserInfo) => (this.currentUser = user)),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }

  public signOut() {
    cfaSignOut()
      .pipe(tap(() => this.router.navigateByUrl('/sign-in')))
      .subscribe();
  }

  public get currentUser() {
    return this.currentUser$.value;
  }

  public set currentUser(user: UserInfo) {
    this.currentUser$.next(user);
  }
}
