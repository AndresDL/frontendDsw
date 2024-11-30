import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultingAddoreditComponent } from './consulting-addoredit.component';

describe('ConsultingAddoreditComponent', () => {
  let component: ConsultingAddoreditComponent;
  let fixture: ComponentFixture<ConsultingAddoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultingAddoreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultingAddoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
