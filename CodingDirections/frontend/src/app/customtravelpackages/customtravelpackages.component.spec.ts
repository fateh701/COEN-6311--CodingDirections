import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTravelpackagesComponent } from './customtravelpackages.component';

describe('CustomtravelpackagesComponent', () => {
  let component: CustomTravelpackagesComponent;
  let fixture: ComponentFixture<CustomTravelpackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTravelpackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTravelpackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
