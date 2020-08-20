import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletMetadata } from 'src/app/core/model/wallet';
import { ApiService } from 'src/app/core/services/api.service';
import { WalletDeleteConfirmDialogComponent } from '../wallet-delete-confirm-dialog/wallet-delete-confirm-dialog.component';
import { WalletEditDialogComponent } from '../wallet-edit-dialog/wallet-edit-dialog.component';
import { WalletNewDialogComponent } from '../wallet-new-dialog/wallet-new-dialog.component';

@Component({
  selector: 'app-wallets-view',
  templateUrl: './wallets-view.component.html',
  styleUrls: ['./wallets-view.component.scss'],
})
export class WalletsViewComponent {
  constructor(public api: ApiService, private dialog: MatDialog) {}

  setMain(walletId: string) {
    this.api.updateUserData({ mainWallet: walletId });
  }

  changeName(wallet: WalletMetadata) {
    this.dialog
      .open(WalletEditDialogComponent, { data: { ...wallet } })
      .afterClosed()
      .subscribe((newWallet) => {
        if (newWallet) {
          this.api.updateWalletMetadata(newWallet);
        }
      });
  }

  delete(wallet: WalletMetadata) {
    console.log(wallet);
    this.dialog
      .open(WalletDeleteConfirmDialogComponent, { data: { ...wallet } })
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.api.deleteWallet(wallet.id);
        }
      });
  }

  newWallet() {
    this.dialog
      .open(WalletNewDialogComponent)
      .afterClosed()
      .subscribe((newWalletName) => {
        if (newWalletName && newWalletName.length > 0) {
          this.api.newWallet(newWalletName);
        }
      });
  }
}
