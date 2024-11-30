import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConsultingAddoreditComponent } from './doctor-consulting-addoredit.component';

describe('DoctorConsultingAddoreditComponent', () => {
  let component: DoctorConsultingAddoreditComponent;
  let fixture: ComponentFixture<DoctorConsultingAddoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorConsultingAddoreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorConsultingAddoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
