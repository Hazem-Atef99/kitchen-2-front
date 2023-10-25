import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionRequestsComponent } from './production-requests.component';

describe('ProductionRequestsComponent', () => {
  let component: ProductionRequestsComponent;
  let fixture: ComponentFixture<ProductionRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionRequestsComponent]
    });
    fixture = TestBed.createComponent(ProductionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
