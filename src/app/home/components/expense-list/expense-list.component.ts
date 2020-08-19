import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Transaction } from 'src/app/core/model/transaction';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
  @Input() walletId: string;

  transactions: Subject<Transaction[]>;

  constructor(public api: ApiService, private router: Router) {}

  ngOnInit() {
    this.transactions = this.walletId ? this.api.getTransactions$(this.walletId) : this.api.mainTransactions;
    this.transactions.subscribe(console.warn);
  }

  editTransaction(transaction: Transaction) {
    this.router.navigateByUrl('/edit-transaction', {
      state: { transaction, walletId: this.walletId || this.api.profile.value.mainWallet },
    });
  }
}
