import { Injectable } from '@angular/core';
import { cfaSignInGoogle, cfaSignOut, mapUserToUserInfo } from 'capacitor-firebase-auth';
import { UserInfo } from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$: BehaviorSubject<UserInfo> = new BehaviorSubject(null);

  constructor() {}

  public googleSignIn() {
    return cfaSignInGoogle().pipe(
      mapUserToUserInfo(),
      tap((user: UserInfo) => (this.currentUser = user))
    );
  }

  public signOut() {
    return cfaSignOut().pipe(tap(() => (this.currentUser = null)));
  }

  public get currentUser() {
    return this.currentUser$.value;
  }

  public set currentUser(user: UserInfo) {
    this.currentUser$.next(user);
  }
}
