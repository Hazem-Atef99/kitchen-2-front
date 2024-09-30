import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportQutationComponent } from './report-qutation.component';

describe('ReportQutationComponent', () => {
  let component: ReportQutationComponent;
  let fixture: ComponentFixture<ReportQutationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportQutationComponent]
    });
    fixture = TestBed.createComponent(ReportQutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
