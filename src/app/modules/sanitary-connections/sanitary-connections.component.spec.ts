import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanitaryConnectionsComponent } from './sanitary-connections.component';

describe('SanitaryConnectionsComponent', () => {
  let component: SanitaryConnectionsComponent;
  let fixture: ComponentFixture<SanitaryConnectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SanitaryConnectionsComponent]
    });
    fixture = TestBed.createComponent(SanitaryConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
