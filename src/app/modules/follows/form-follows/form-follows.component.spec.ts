import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFollowsComponent } from './form-follows.component';

describe('FormFollowsComponent', () => {
  let component: FormFollowsComponent;
  let fixture: ComponentFixture<FormFollowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFollowsComponent]
    });
    fixture = TestBed.createComponent(FormFollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
