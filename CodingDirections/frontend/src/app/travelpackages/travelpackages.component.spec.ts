import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelpackagesComponent } from './travelpackages.component';

describe('TravelpackagesComponent', () => {
  let component: TravelpackagesComponent;
  let fixture: ComponentFixture<TravelpackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelpackagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelpackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
