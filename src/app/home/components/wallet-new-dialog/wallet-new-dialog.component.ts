import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-wallet-new-dialog',
  templateUrl: './wallet-new-dialog.component.html',
  styleUrls: ['./wallet-new-dialog.component.scss'],
})
export class WalletNewDialogComponent {
  walletName = '';

  constructor(public dialogRef: MatDialogRef<WalletNewDialogComponent>) {}

  cancel() {
    this.dialogRef.close();
  }
}
