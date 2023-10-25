import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductionRequestsComponent } from './form-production-requests.component';

describe('FormProductionRequestsComponent', () => {
  let component: FormProductionRequestsComponent;
  let fixture: ComponentFixture<FormProductionRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProductionRequestsComponent]
    });
    fixture = TestBed.createComponent(FormProductionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
