import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyAddoreditComponent } from './specialty-addoredit.component';

describe('SpecialtyAddoreditComponent', () => {
  let component: SpecialtyAddoreditComponent;
  let fixture: ComponentFixture<SpecialtyAddoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialtyAddoreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialtyAddoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
