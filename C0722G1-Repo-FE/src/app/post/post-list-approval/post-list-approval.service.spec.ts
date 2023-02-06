import { TestBed } from '@angular/core/testing';

import { PostListApprovalService } from './post-list-approval.service';

describe('PostListApprovalService', () => {
  let service: PostListApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostListApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
