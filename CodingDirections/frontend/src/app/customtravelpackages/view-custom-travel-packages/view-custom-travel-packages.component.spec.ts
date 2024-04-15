import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomTravelPackagesComponent } from './view-custom-travel-packages.component';

describe('ViewCustomTravelPackagesComponent', () => {
  let component: ViewCustomTravelPackagesComponent;
  let fixture: ComponentFixture<ViewCustomTravelPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCustomTravelPackagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCustomTravelPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
