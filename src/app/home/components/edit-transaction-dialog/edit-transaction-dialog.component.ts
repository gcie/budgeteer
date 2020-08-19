import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { Transaction } from 'src/app/core/model/transaction';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-edit-transaction-dialog',
  templateUrl: './edit-transaction-dialog.component.html',
  styleUrls: ['./edit-transaction-dialog.component.scss'],
})
export class EditTransactionDialogComponent implements OnInit {
  mode: 'income' | 'expense' = 'expense';
  walletId: string;

  transaction: Transaction;

  @ViewChild('selectedWallets') selectedWallets: MatSelectionList;

  transactionGroup: FormGroup;

  constructor(private location: Location, public api: ApiService) {
    this.transactionGroup = new FormGroup({
      amount: new FormControl(null, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      category: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    console.log(this.location.getState());
    this.transaction = (this.location.getState() as any).transaction;
    this.walletId = (this.location.getState() as any).walletId;

    this.mode = this.transaction.mode || 'expense';

    this.transactionGroup.patchValue({
      amount: this.transaction.amount,
      date: this.transaction.date,
      category: this.transaction.category,
    });
  }

  cancel() {
    this.location.back();
  }

  update() {
    if (this.transactionGroup.valid) {
      console.log(this.transactionGroup.value);
      console.log(this.walletId);
      this.api.updateTransaction(this.walletId, { ...this.transactionGroup.value, mode: this.mode });
      this.location.back();
    }
  }

  delete() {
    this.api.deleteTransaction(this.walletId, this.transaction.id);
    this.location.back();
  }
}
