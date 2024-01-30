import { TestBed } from '@angular/core/testing';

import { SanitaryConnectionsService } from './sanitary-connections.service';

describe('SanitaryConnectionsService', () => {
  let service: SanitaryConnectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanitaryConnectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
