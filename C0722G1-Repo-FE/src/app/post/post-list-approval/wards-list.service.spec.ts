import { TestBed } from '@angular/core/testing';

import { WardsListService } from './wards-list.service';

describe('WardsListService', () => {
  let service: WardsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WardsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
