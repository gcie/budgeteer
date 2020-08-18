import { Component, OnInit } from '@angular/core';
import { Wallet } from 'src/app/core/model/wallet';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-wallets-view',
  templateUrl: './wallets-view.component.html',
  styleUrls: ['./wallets-view.component.scss'],
})
export class WalletsViewComponent implements OnInit {
  wallets: Wallet[];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.apiService.getWallets().subscribe((wallets) => (this.wallets = wallets));
  }
}
