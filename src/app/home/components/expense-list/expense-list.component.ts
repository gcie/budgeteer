import { DataSource } from '@angular/cdk/table';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/core/model/transaction';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit, AfterViewInit {
  @Input() walletId: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  transactions: Observable<Transaction[]>;

  dataSource = new TransactionDataSource(this.api);
  displayedColumns: string[] = ['position', 'name', 'weight', 'price'];

  constructor(public api: ApiService, private router: Router) {}

  ngOnInit() {
    this.transactions = this.walletId ? this.api.getTransactions$(this.walletId) : this.api.mainTransactions;
  }

  ngAfterViewInit() {
    // this.paginator
  }

  editTransaction(transaction: Transaction) {
    this.router.navigateByUrl('/edit-transaction', {
      state: { transaction, walletId: this.walletId || this.api.profile.value.mainWallet },
    });
  }
}

export class TransactionDataSource extends DataSource<Transaction> {
  constructor(private api: ApiService) {
    super();
  }

  connect(): Observable<Transaction[]> {
    return this.api.mainTransactions.pipe(map((ts) => ts.slice(0, 5)));
  }

  disconnect() {}
}
