import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { Wallet } from 'src/app/core/model/wallet';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-new-transaction-dialog',
  templateUrl: './new-transaction-dialog.component.html',
  styleUrls: ['./new-transaction-dialog.component.scss'],
})
export class NewTransactionDialogComponent {
  mode: 'income' | 'expense' = 'expense';
  wallet: Wallet;

  @ViewChild('selectedWallets') selectedWallets: MatSelectionList;

  transactionGroup: FormGroup;

  constructor(private location: Location, public api: ApiService) {
    this.transactionGroup = new FormGroup({
      amount: new FormControl(null, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      category: new FormControl(null, Validators.required),
      description: new FormControl(''),
    });
  }

  cancel() {
    this.location.back();
  }

  submit() {
    if (this.transactionGroup.valid && this.selectedWallets.selectedOptions.selected.length > 0) {
      this.api.addTransaction(
        this.selectedWallets.selectedOptions.selected.map((option) => option.value),
        { ...this.transactionGroup.value, mode: this.mode }
      );
      this.location.back();
    }
  }
}
