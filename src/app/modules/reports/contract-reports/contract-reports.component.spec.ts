import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractReportsComponent } from './contract-reports.component';

describe('ContractReportsComponent', () => {
  let component: ContractReportsComponent;
  let fixture: ComponentFixture<ContractReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractReportsComponent]
    });
    fixture = TestBed.createComponent(ContractReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
