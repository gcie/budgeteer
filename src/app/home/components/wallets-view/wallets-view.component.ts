import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-wallets-view',
  templateUrl: './wallets-view.component.html',
  styleUrls: ['./wallets-view.component.scss'],
})
export class WalletsViewComponent {
  constructor(public api: ApiService) {}

  setMain(walletId: string) {
    this.api.updateUserData({ mainWallet: walletId });
  }
}
