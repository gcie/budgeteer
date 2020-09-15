import { Injectable } from '@angular/core';
import { auth, database } from 'firebase';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileData } from '../model/profile-data';
import { Transaction } from '../model/transaction';
import { Wallet, WalletMetadata } from '../model/wallet';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private profileDbRef: database.Reference;
  private userWalletsDbRef: database.Reference;
  private mainWalletDbRef: database.Reference;
  private walletsDbRef: database.Reference[];

  private mainWalletId: string;

  profile: BehaviorSubject<ProfileData> = new BehaviorSubject(null);
  wallets: BehaviorSubject<WalletMetadata>[] = [];
  mainWallet: BehaviorSubject<Wallet> = new BehaviorSubject(null);
  mainTransactions: Observable<Transaction[]> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {
    this.profileInit();
    this.walletsInit();
    this.mainWalletInit();
    this.mainTransactions = this.mainWallet.pipe(map((wallet) => wallet?.transactions));
  }

  newWallet(walletName: string) {
    const dbRef = database().ref(`wallets`);
    const newKey = dbRef.push().key;

    const wallet = new Wallet();
    wallet.members = {};
    wallet.members[this.authService.user.uid] = 'owner';
    wallet.metadata = { id: newKey, name: walletName };
    wallet.transactions = [];

    // create new wallet
    dbRef.child(newKey).set(wallet);

    // add wallet to user data
    this.updateUserData({ wallets: [...this.profile.value.wallets, newKey] });
  }

  updateWalletMetadata(wallet: WalletMetadata) {
    database().ref(`wallets/${wallet.id}/metadata`).update(wallet);
  }

  deleteWallet(walletId: string) {
    // remove wallet from database
    database().ref(`wallets/${walletId}`).remove();

    // remove wallet from user data
    this.updateUserData({ wallets: this.profile.value.wallets.filter((id) => id !== walletId) });
  }

  updateUserData(userData: Partial<ProfileData>) {
    database().ref(`users/${auth().currentUser.uid}`).update(userData);
  }

  addTransaction(walletIds: string[], transaction: Transaction) {
    // save last used wallets
    this.updateUserData({ activeWallets: walletIds });

    // add transaction to each wallet
    walletIds.forEach((walletId) => {
      const dbRef = database().ref(`wallets/${walletId}/transactions`);
      const newKey = dbRef.push().key;
      dbRef.child(newKey).set({
        id: newKey,
        amount: transaction.amount,
        date: transaction.date.toJSON(),
        category: transaction.category,
        mode: transaction.mode,
        description: transaction.description || '',
        addedBy: this.authService.user.displayName,
      });
    });
  }

  updateTransaction(walletId: string, newTransaction: Partial<Transaction>) {
    const update = newTransaction as any;
    update.date = newTransaction.date.toJSON();
    database().ref(`wallets/${walletId}/transactions/${newTransaction.id}`).update(update);
  }

  deleteTransaction(walletId: string, transactionId: string) {
    database().ref(`wallets/${walletId}/transactions/${transactionId}`).remove();
  }

  getTransactions$(walletId: string): Subject<Transaction[]> {
    const transactions$ = new BehaviorSubject([]);
    database()
      .ref(`wallets/${walletId}/transactions`)
      .on('value', (data) => {
        const transactions = data.val() ? (Object.values(data.val()) as Transaction[]) : [];
        transactions.forEach((t) => (t.date = new Date(t.date)));
        transactions$.next(transactions.sort((b, a) => a.date.getTime() - b.date.getTime()));
      });
    return transactions$;
  }

  private profileInit() {
    this.authService.authState$.subscribe((authState) => {
      this.profileDbRef?.off();
      (this.profileDbRef = database().ref(`users/${authState.user.uid}`)).on('value', (profile) => {
        this.profile.next(profile.val());
      });
    });
  }

  private walletsInit() {
    this.authService.authState$.subscribe((authState) => {
      this.userWalletsDbRef?.off();
      (this.userWalletsDbRef = database().ref(`users/${authState.user.uid}/wallets`)).on('value', (walletsIds) => {
        // turn off active connections, if such exist
        this.walletsDbRef?.forEach((dbRef) => dbRef.off());
        // create new connections to wallets' metadata property
        this.walletsDbRef = (walletsIds.val() || []).map((walletId) =>
          database().ref(`wallets/${walletId}/metadata`)
        ) as database.Reference[];

        this.wallets = this.walletsDbRef.map((dbRef) => {
          const subject = new BehaviorSubject(null);

          dbRef.on('value', (data) => {
            subject.next(data.val());
          });
          return subject;
        });
      });
    });
  }

  private mainWalletInit() {
    this.profile.subscribe((profile) => {
      if (!profile || !profile.mainWallet) {
        return;
      } else if (profile.mainWallet !== this.mainWalletId) {
        this.mainWalletId = profile.mainWallet;
        this.mainWalletDbRef?.off();
        (this.mainWalletDbRef = database().ref(`wallets/${profile.mainWallet}`)).on('value', (data) => {
          const wallet = data.val();
          wallet.transactions = wallet.transactions ? Object.values(wallet.transactions) : [];
          wallet.transactions.forEach((tr) => {
            tr.date = new Date(tr.date);
          });
          wallet.transactions = wallet.transactions.sort((b, a) => a.date.getTime() - b.date.getTime());
          this.mainWallet.next(wallet);
        });
      }
    });
  }
}
