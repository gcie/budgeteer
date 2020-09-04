import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { cfaSignIn, cfaSignOut, mapUserToUserInfo } from 'capacitor-firebase-auth';
import { auth, UserInfo } from 'firebase';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthState } from '../model/auth-state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$: BehaviorSubject<AuthState> = new BehaviorSubject(null);

  constructor(private router: Router) {
    auth().onAuthStateChanged((authState) => {
      console.log('[onAuthStateChanged] authState update', authState);
      of(authState)
        .pipe(mapUserToUserInfo())
        .subscribe((user: UserInfo) => {
          this.authState$.next({ resolved: true, user });
        });
    });
  }

  public googleSignIn() {
    if (auth().currentUser) {
      this.authState$.next({ resolved: true, user: auth().currentUser });
    }
    cfaSignIn('google.com')
      .pipe(
        mapUserToUserInfo(),
        tap((user: UserInfo) => {
          console.log('[googleSignIn] authState update');
          this.authState$.next({ resolved: true, user });
        }),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }

  public signOut() {
    cfaSignOut()
      .pipe(tap(() => this.router.navigateByUrl('/sign-in')))
      .subscribe();
  }

  public get authState(): AuthState {
    return this.authState$.value;
  }

  public get user(): UserInfo {
    return this.authState$.value?.user;
  }
}
