import { TestBed } from '@angular/core/testing';

import { AdminEmployeeGuard } from './admin-employee.guard';

describe('AdminEmployeeGuard', () => {
  let guard: AdminEmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminEmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
