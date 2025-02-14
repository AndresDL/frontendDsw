import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupTreatmentComponent } from './followup-treatment.component';

describe('FollowupTreatmentComponent', () => {
  let component: FollowupTreatmentComponent;
  let fixture: ComponentFixture<FollowupTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowupTreatmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowupTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
