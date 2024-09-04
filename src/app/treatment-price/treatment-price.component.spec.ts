import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentPriceComponent } from './treatment-price.component';

describe('TreatmentPriceComponent', () => {
  let component: TreatmentPriceComponent;
  let fixture: ComponentFixture<TreatmentPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreatmentPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
