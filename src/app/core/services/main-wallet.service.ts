import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from '../model/transaction';
import { Wallet } from '../model/wallet';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MainWalletService {
  wallet: Observable<Wallet>;
  walletId: Observable<string>;
  allTransactions: Observable<Transaction[]>;
  currentMonthTransactions: Observable<Transaction[]>;

  currentMonthIncome: Observable<number>;
  currentMonthExpenses: Observable<number>;
  currentMonthDiff: Observable<number>;

  constructor(private api: ApiService) {
    this.allTransactions = this.api.mainTransactions;
    this.currentMonthTransactions = this.api.mainTransactions.pipe(map(this.filterCurrentMonth));
    this.wallet = this.api.mainWallet;
    this.wallet.subscribe(console.warn);

    this.currentMonthIncome = this.currentMonthTransactions.pipe(
      map(this.filterMode('income')),
      map((trs) => trs?.reduce((total, tr) => total + tr.amount, 0))
    );

    this.currentMonthExpenses = this.currentMonthTransactions.pipe(
      map(this.filterMode('expense')),
      map((trs) => trs?.reduce((total, tr) => total + tr.amount, 0))
    );

    this.currentMonthDiff = zip(this.currentMonthIncome, this.currentMonthExpenses).pipe(map(([income, expenses]) => income - expenses));
  }

  private filterCurrentMonth(trs: Transaction[]): Transaction[] {
    return trs?.filter((tr) => tr.date.getFullYear() === new Date().getFullYear() && tr.date.getMonth() === new Date().getMonth());
  }

  private filterMode(mode: 'income' | 'expense') {
    return (trs: Transaction[]) => trs?.filter((tr) => tr.mode === mode);
  }
}
