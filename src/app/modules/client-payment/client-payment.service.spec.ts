import { TestBed } from '@angular/core/testing';

import { ClientPaymentService } from './client-payment.service';

describe('ClientPaymentService', () => {
  let service: ClientPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
