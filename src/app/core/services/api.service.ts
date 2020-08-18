import { Injectable } from '@angular/core';
import { auth, database } from 'firebase';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProfileData } from '../model/profile-data';
import { Transaction } from '../model/transaction';
import { Wallet } from '../model/wallet';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private profileDbRef: database.Reference;
  private walletsDbRef: database.Reference;
  private mainTransactionsDbRef: database.Reference;

  private mainWalletId: string;

  profile: Subject<ProfileData> = new BehaviorSubject(null);
  wallets: Subject<Wallet[]> = new BehaviorSubject(null);
  mainTransactions: Subject<Transaction[]> = new BehaviorSubject(null);

  constructor() {
    this.profileInit();
    this.walletsInit();
    this.mainTransactionsInit();
  }

  getTransactions(walletId: string): Observable<Transaction[]> {
    return new Observable((subscriber) => {
      database()
        .ref(`wallets/${walletId}/transactions`)
        .once(
          'value',
          (transactions) => {
            subscriber.next(transactions?.val() || []);
            subscriber.complete();
          },
          subscriber.error
        );
    });
  }

  getTransactions$(walletId: string): Subject<Transaction[]> {
    const transactions$ = new BehaviorSubject([]);
    database()
      .ref(`wallets/${walletId}/transactions`)
      .on('value', (transactions) => {
        transactions$.next(transactions?.val() || []);
      });
    return transactions$;
  }

  private profileInit() {
    this.profileDbRef = database().ref(`users/${auth().currentUser.uid}`);
    this.profileDbRef.on('value', (profile) => {
      this.profile.next(profile.val());
    });
  }

  private walletsInit() {
    this.walletsDbRef = database().ref(`users/${auth().currentUser.uid}/wallets`);
    this.walletsDbRef.on('value', (walletsIds) => {
      Promise.all((walletsIds.val() || []).map((walletId) => database().ref(`wallets/${walletId}`).once('value'))).then((wallets) => {
        // tslint:disable-next-line: no-string-literal
        this.wallets.next(wallets.map((i) => i['val']()));
      });
    });
  }

  private mainTransactionsInit() {
    this.profile.subscribe((profile) => {
      if (!profile || !profile.mainWallet) {
        return;
      } else if (profile.mainWallet !== this.mainWalletId) {
        this.mainWalletId = profile.mainWallet;
        if (this.mainTransactionsDbRef) {
          this.mainTransactionsDbRef.off();
        }
        this.mainTransactionsDbRef = database().ref(`wallets/${profile.mainWallet}/transactions`);
        this.mainTransactionsDbRef.on('value', (transactions) => {
          this.mainTransactions.next(transactions.val() || []);
        });
      }
    });
  }
}
