import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionReportComponent } from './reception-report.component';

describe('ReceptionReportComponent', () => {
  let component: ReceptionReportComponent;
  let fixture: ComponentFixture<ReceptionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceptionReportComponent]
    });
    fixture = TestBed.createComponent(ReceptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
