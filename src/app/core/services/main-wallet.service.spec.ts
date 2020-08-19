import { TestBed } from '@angular/core/testing';
import { MainWalletService } from './main-wallet.service';

describe('MainWalletService', () => {
  let service: MainWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
