import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsReviewComponent } from './bookings-review.component';

describe('BookingsReviewComponent', () => {
  let component: BookingsReviewComponent;
  let fixture: ComponentFixture<BookingsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingsReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
