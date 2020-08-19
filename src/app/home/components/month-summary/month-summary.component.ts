import { Component, OnInit } from '@angular/core';
import { MainWalletService } from 'src/app/core/services/main-wallet.service';

@Component({
  selector: 'app-month-summary',
  templateUrl: './month-summary.component.html',
  styleUrls: ['./month-summary.component.scss'],
})
export class MonthSummaryComponent implements OnInit {
  constructor(public wallet: MainWalletService) {}

  ngOnInit() {}
}
