import { TestBed } from '@angular/core/testing';

import { FilterAuthenticationGuard } from './filter-authentication.guard';

describe('FilterAuthenticationGuard', () => {
  let guard: FilterAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FilterAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
