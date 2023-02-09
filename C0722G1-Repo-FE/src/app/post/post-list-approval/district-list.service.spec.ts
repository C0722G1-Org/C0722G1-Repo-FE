import { TestBed } from '@angular/core/testing';

import { DistrictListService } from './district-list.service';

describe('DistrictListService', () => {
  let service: DistrictListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
