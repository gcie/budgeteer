import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { combineLatest } from 'rxjs';
import { MainWalletService } from 'src/app/core/services/main-wallet.service';

@Component({
  selector: 'app-month-summary',
  templateUrl: './month-summary.component.html',
  styleUrls: ['./month-summary.component.scss'],
})
export class MonthSummaryComponent implements OnInit {
  constructor(public wallet: MainWalletService) {}

  chartData = [0, 0];
  chartColors = [{ backgroundColor: ['#4caf50', '#f44336'] }];
  chartOptions: ChartOptions = {
    legend: {
      display: false,
    },
  };

  ngOnInit() {
    combineLatest([this.wallet.currentMonthIncome, this.wallet.currentMonthExpenses]).subscribe(([income, expense]) => {
      if (income > 0 || expense > 0) {
        this.chartData = [income / (income + expense), expense / (income + expense)];
      }
    });
  }
}
