import { TestBed } from '@angular/core/testing';

import { NotRouteLoginGuard } from './not-route-login.guard';

describe('NotRouteLoginGuard', () => {
  let guard: NotRouteLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotRouteLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
