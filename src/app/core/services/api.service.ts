import { Injectable } from '@angular/core';
import { auth, database } from 'firebase';
import { Observable } from 'rxjs';
import { Wallet } from '../model/wallet';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getWallets(): Observable<Wallet[]> {
    return new Observable((subscribe) => {
      database()
        .ref(`users/${auth().currentUser.uid}/wallets`)
        .once(
          'value',
          (walletsIds) => {
            console.log(walletsIds.val());
            Promise.all(walletsIds.val().map((walletId) => database().ref(`wallets/${walletId}`).once('value')))
              .then((wallets) => {
                // tslint:disable-next-line: no-string-literal
                subscribe.next(wallets.map((i) => i['val']()));
                subscribe.complete();
              })
              .catch(subscribe.error);
          },
          subscribe.error
        );
    });
  }
}
