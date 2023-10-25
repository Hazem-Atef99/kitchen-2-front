import { TestBed } from '@angular/core/testing';

import { ProductionRequestsService } from './production-requests.service';

describe('ProductionRequestsService', () => {
  let service: ProductionRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
