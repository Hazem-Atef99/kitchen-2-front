import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReceptionReportComponent } from './form-reception-report.component';

describe('FormReceptionReportComponent', () => {
  let component: FormReceptionReportComponent;
  let fixture: ComponentFixture<FormReceptionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormReceptionReportComponent]
    });
    fixture = TestBed.createComponent(FormReceptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
