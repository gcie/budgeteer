import { Component } from '@angular/core';
import { database } from 'firebase';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent {
  constructor(public api: ApiService) {}

  test() {
    const newKey = database().ref('wallets').push().key;
    console.log(newKey);
  }
}
