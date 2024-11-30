import { TestBed } from '@angular/core/testing';

import { TimeTableService } from '../servicies/time-table.service';

describe('TimeTableService', () => {
  let service: TimeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
