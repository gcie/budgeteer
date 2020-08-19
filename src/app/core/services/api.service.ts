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

  profile: BehaviorSubject<ProfileData> = new BehaviorSubject(null);
  wallets: BehaviorSubject<Wallet[]> = new BehaviorSubject(null);
  mainTransactions: BehaviorSubject<Transaction[]> = new BehaviorSubject(null);

  constructor() {
    this.profileInit();
    this.walletsInit();
    this.mainTransactionsInit();
  }

  updateUserData(userData: Partial<ProfileData>) {
    database().ref(`users/${auth().currentUser.uid}`).update(userData);
  }

  addTransaction(walletIds: string[], transaction: Transaction) {
    // save last used wallets
    this.updateUserData({ activeWallets: walletIds });

    // add transaction to each wallet
    walletIds.forEach((walletId) => {
      console.log(transaction.date.toJSON());
      const dbRef = database().ref(`wallets/${walletId}/transactions`);
      const newKey = dbRef.push().key;
      dbRef.child(newKey).set({
        id: newKey,
        amount: transaction.amount,
        date: transaction.date.toJSON(),
        category: transaction.category,
        mode: transaction.mode,
        description: transaction.description || '',
      });
    });
  }

  updateTransaction(walletId: string, newTransaction: Transaction) {
    const update = newTransaction as any;
    update.date = newTransaction.date.toJSON();
    database().ref(`wallets/${walletId}/transactions/${newTransaction.id}`).update(update);
  }

  deleteTransaction(walletId: string, transactionId: string) {
    database().ref(`wallets/${walletId}/transactions/${transactionId}`).remove();
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
      .on('value', (data) => {
        const transactions = (Object.values(data?.val()) || []) as Transaction[];
        transactions.forEach((t) => (t.date = new Date(t.date)));
        transactions$.next(transactions.sort((b, a) => a.date.getTime() - b.date.getTime()));
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
        this.mainTransactionsDbRef.on('value', (data) => {
          const transactions = (Object.values(data?.val()) || []) as Transaction[];
          transactions.forEach((t) => (t.date = new Date(t.date)));
          this.mainTransactions.next(transactions.sort((b, a) => a.date.getTime() - b.date.getTime()));
        });
      }
    });
  }
}
