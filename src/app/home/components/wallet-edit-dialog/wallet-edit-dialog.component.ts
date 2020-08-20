import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WalletMetadata } from 'src/app/core/model/wallet';

@Component({
  selector: 'app-wallet-edit-dialog',
  templateUrl: './wallet-edit-dialog.component.html',
  styleUrls: ['./wallet-edit-dialog.component.scss'],
})
export class WalletEditDialogComponent {
  constructor(public dialogRef: MatDialogRef<WalletEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public wallet: WalletMetadata) {}

  cancel() {
    this.dialogRef.close();
  }
}
