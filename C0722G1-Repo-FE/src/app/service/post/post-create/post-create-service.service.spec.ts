import { TestBed } from '@angular/core/testing';

import { PostCreateServiceService } from './post-create-service.service';

describe('PostCreateServiceService', () => {
  let service: PostCreateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCreateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
