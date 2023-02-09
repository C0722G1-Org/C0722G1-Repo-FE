import { TestBed } from '@angular/core/testing';

import { PostListCustomerService } from './post-list-customer.service';

describe('PostListCustomerService', () => {
  let service: PostListCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostListCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
