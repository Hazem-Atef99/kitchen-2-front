import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSanitaryConnectionsComponent } from './form-sanitary-connections.component';

describe('FormSanitaryConnectionsComponent', () => {
  let component: FormSanitaryConnectionsComponent;
  let fixture: ComponentFixture<FormSanitaryConnectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSanitaryConnectionsComponent]
    });
    fixture = TestBed.createComponent(FormSanitaryConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
