import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTravelPackagesComponent } from './view-travel-packages.component';

describe('ViewTravelPackagesComponent', () => {
  let component: ViewTravelPackagesComponent;
  let fixture: ComponentFixture<ViewTravelPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTravelPackagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTravelPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
