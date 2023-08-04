import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuotationComponent } from './form-quotation.component';

describe('FormQuotationComponent', () => {
  let component: FormQuotationComponent;
  let fixture: ComponentFixture<FormQuotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormQuotationComponent]
    });
    fixture = TestBed.createComponent(FormQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
