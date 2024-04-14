import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBookingsConfirmationComponent } from './custom-bookings-confirmation.component';

describe('CustomBookingsConfirmationComponent', () => {
  let component: CustomBookingsConfirmationComponent;
  let fixture: ComponentFixture<CustomBookingsConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomBookingsConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomBookingsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
