import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSignInComponent } from './doctor-sign-in.component';

describe('DoctorSignInComponent', () => {
  let component: DoctorSignInComponent;
  let fixture: ComponentFixture<DoctorSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorSignInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
