import { TestBed } from '@angular/core/testing';

import { DoctorConsultingService } from './doctor-consulting.service';

describe('DoctorConsultingService', () => {
  let service: DoctorConsultingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorConsultingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
