import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPackageFormComponent } from './travel-package-form.component';

describe('TravelPackageFormComponent', () => {
  let component: TravelPackageFormComponent;
  let fixture: ComponentFixture<TravelPackageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelPackageFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelPackageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
