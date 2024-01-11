import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientShortageDetailsComponent } from './client-shortage-details.component';

describe('ClientShortageDetailsComponent', () => {
  let component: ClientShortageDetailsComponent;
  let fixture: ComponentFixture<ClientShortageDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientShortageDetailsComponent]
    });
    fixture = TestBed.createComponent(ClientShortageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
