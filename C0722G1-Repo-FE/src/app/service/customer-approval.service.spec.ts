import { TestBed } from '@angular/core/testing';

import { CustomerApprovalService } from './customer-approval.service';

describe('CustomerApprovalService', () => {
  let service: CustomerApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
