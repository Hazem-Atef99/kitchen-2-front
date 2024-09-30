import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProductionRequestsComponent } from './report-production-requests.component';

describe('ReportProductionRequestsComponent', () => {
  let component: ReportProductionRequestsComponent;
  let fixture: ComponentFixture<ReportProductionRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportProductionRequestsComponent]
    });
    fixture = TestBed.createComponent(ReportProductionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
