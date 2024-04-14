import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTravelPackageFormComponent } from './custom-travel-package-form.component';

describe('CustomTravelPackageFormComponent', () => {
  let component: CustomTravelPackageFormComponent;
  let fixture: ComponentFixture<CustomTravelPackageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTravelPackageFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomTravelPackageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
