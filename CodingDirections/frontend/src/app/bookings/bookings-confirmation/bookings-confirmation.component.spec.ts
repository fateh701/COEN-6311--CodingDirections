import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsConfirmationComponent } from './bookings-confirmation.component';

describe('BookingsConfirmationComponent', () => {
  let component: BookingsConfirmationComponent;
  let fixture: ComponentFixture<BookingsConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingsConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
