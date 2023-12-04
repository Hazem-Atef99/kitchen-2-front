import { TestBed } from '@angular/core/testing';

import { ReceptionReportService } from './reception-report.service';

describe('ReceptionReportService', () => {
  let service: ReceptionReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceptionReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
