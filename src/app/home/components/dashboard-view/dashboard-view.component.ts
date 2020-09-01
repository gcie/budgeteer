import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { database } from 'firebase';
import { filter, take } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent implements OnInit {
  activeWallet: string;

  constructor(public api: ApiService, public router: Router) {}

  ngOnInit() {
    this.api.profile
      .pipe(
        filter((x) => x !== null),
        take(1)
      )
      .subscribe((profile) => {
        this.activeWallet = profile.mainWallet;
      });
    // this.newTransaction();
  }

  test() {
    const newKey = database().ref('wallets').push().key;
    console.log(newKey);
  }

  newTransaction() {
    this.router.navigateByUrl('/new-transaction');
  }
}
