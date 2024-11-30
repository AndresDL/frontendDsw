import { TestBed } from '@angular/core/testing';

import { FollowupTreatmentService } from './followup-treatment.service';

describe('FollowupTreatmentService', () => {
  let service: FollowupTreatmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowupTreatmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
