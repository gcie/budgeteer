import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
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

  monthList: Observable<{ year: number; month: number }[]>;

  currentMonthIncome: Observable<number>;
  currentMonthExpenses: Observable<number>;
  currentMonthDiff: Observable<number>;

  constructor(private api: ApiService) {
    this.allTransactions = this.api.mainTransactions;
    this.currentMonthTransactions = this.api.mainTransactions.pipe(map(this.filterCurrentMonth));
    this.wallet = this.api.mainWallet;

    this.currentMonthIncome = this.currentMonthTransactions.pipe(
      map(this.filterMode('income')),
      map((trs) => trs?.reduce((total, tr) => total + tr.amount, 0))
    );

    this.currentMonthExpenses = this.currentMonthTransactions.pipe(
      map(this.filterMode('expense')),
      map((trs) => trs?.reduce((total, tr) => total + tr.amount, 0))
    );

    this.currentMonthDiff = combineLatest([this.currentMonthIncome, this.currentMonthExpenses]).pipe(
      map(([income, expenses]) => income - expenses)
    );

    this.monthList = this.api.mainTransactions.pipe(
      map((transactions) =>
        transactions.reduce((months: { year: number; month: number }[], tr) => {
          if (!months.find(({ year, month }) => year === tr.date.getFullYear() && month === tr.date.getMonth())) {
            months.push({ year: tr.date.getFullYear(), month: tr.date.getMonth() });
          }
          return months;
        }, [])
      ),
      map((months) => months.sort((m1, m2) => (m1.year === m2.year ? m2.month - m1.month : m2.year - m1.year)))
    );

    this.monthList.subscribe(console.log.bind(this, '[monthList]'));
  }

  private filterCurrentMonth(trs: Transaction[]): Transaction[] {
    return trs?.filter((tr) => tr.date.getFullYear() === new Date().getFullYear() && tr.date.getMonth() === new Date().getMonth());
  }

  private filterMode(mode: 'income' | 'expense') {
    return (trs: Transaction[]) => trs?.filter((tr) => tr.mode === mode);
  }
}
