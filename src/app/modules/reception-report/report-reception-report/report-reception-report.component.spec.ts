import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReceptionReportComponent } from './report-reception-report.component';

describe('ReportReceptionReportComponent', () => {
  let component: ReportReceptionReportComponent;
  let fixture: ComponentFixture<ReportReceptionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportReceptionReportComponent]
    });
    fixture = TestBed.createComponent(ReportReceptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
