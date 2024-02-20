import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHotelsComponent } from './view-hotels.component';

describe('ViewHotelsComponent', () => {
  let component: ViewHotelsComponent;
  let fixture: ComponentFixture<ViewHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHotelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
