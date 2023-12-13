import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTopComponent } from './form-top.component';

describe('FormTopComponent', () => {
  let component: FormTopComponent;
  let fixture: ComponentFixture<FormTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTopComponent]
    });
    fixture = TestBed.createComponent(FormTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
