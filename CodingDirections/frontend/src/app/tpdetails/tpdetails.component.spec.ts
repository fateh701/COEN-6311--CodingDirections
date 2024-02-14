import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpdetailsComponent } from './tpdetails.component';

describe('TpdetailsComponent', () => {
  let component: TpdetailsComponent;
  let fixture: ComponentFixture<TpdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TpdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TpdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
