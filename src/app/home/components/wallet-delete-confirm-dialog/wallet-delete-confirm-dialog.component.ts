import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WalletMetadata } from 'src/app/core/model/wallet';

@Component({
  selector: 'app-wallet-delete-confirm-dialog',
  templateUrl: './wallet-delete-confirm-dialog.component.html',
  styleUrls: ['./wallet-delete-confirm-dialog.component.scss'],
})
export class WalletDeleteConfirmDialogComponent {
  confirmName = '';

  constructor(public dialogRef: MatDialogRef<WalletDeleteConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public wallet: WalletMetadata) {}

  cancel() {
    this.dialogRef.close();
  }
}
