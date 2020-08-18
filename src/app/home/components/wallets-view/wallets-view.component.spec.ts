import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { WalletsViewComponent } from './wallets-view.component';

describe('WalletsViewComponent', () => {
  let component: WalletsViewComponent;
  let fixture: ComponentFixture<WalletsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WalletsViewComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
