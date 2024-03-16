import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsAllComponent } from './bookings-all.component';

describe('BookingsAllComponent', () => {
  let component: BookingsAllComponent;
  let fixture: ComponentFixture<BookingsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingsAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
