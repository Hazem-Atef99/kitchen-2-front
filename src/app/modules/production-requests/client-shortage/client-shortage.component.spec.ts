import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientShortageComponent } from './client-shortage.component';

describe('ClientShortageComponent', () => {
  let component: ClientShortageComponent;
  let fixture: ComponentFixture<ClientShortageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientShortageComponent]
    });
    fixture = TestBed.createComponent(ClientShortageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
