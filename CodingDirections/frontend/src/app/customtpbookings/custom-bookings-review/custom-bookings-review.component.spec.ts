import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBookingsReviewComponent } from './custom-bookings-review.component';

describe('CustomBookingsReviewComponent', () => {
  let component: CustomBookingsReviewComponent;
  let fixture: ComponentFixture<CustomBookingsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomBookingsReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomBookingsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
