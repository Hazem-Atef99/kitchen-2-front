import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractReportComponent } from './contract-report.component';

describe('ContractReportComponent', () => {
  let component: ContractReportComponent;
  let fixture: ComponentFixture<ContractReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractReportComponent]
    });
    fixture = TestBed.createComponent(ContractReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
