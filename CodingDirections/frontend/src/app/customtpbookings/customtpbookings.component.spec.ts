import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomtpbookingsComponent } from './customtpbookings.component';

describe('CustomtpbookingsComponent', () => {
  let component: CustomtpbookingsComponent;
  let fixture: ComponentFixture<CustomtpbookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomtpbookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomtpbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
