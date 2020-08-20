import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WalletDeleteConfirmDialogComponent } from './wallet-delete-confirm-dialog.component';

describe('WalletDeleteConfirmDialogComponent', () => {
  let component: WalletDeleteConfirmDialogComponent;
  let fixture: ComponentFixture<WalletDeleteConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletDeleteConfirmDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WalletDeleteConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
