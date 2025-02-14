import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logAuthGuard } from './log-auth.guard';

describe('logAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
