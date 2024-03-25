import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelFormComponent } from './hotel-form.component';

describe('HotelFormComponent', () => {
  let component: HotelFormComponent;
  let fixture: ComponentFixture<HotelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
