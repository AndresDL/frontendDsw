import { TestBed } from '@angular/core/testing';

import { TreatmentPriceService } from './treatment-price.service';

describe('TreatmentPriceService', () => {
  let service: TreatmentPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
