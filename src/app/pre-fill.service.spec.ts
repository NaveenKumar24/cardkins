import { TestBed } from '@angular/core/testing';

import { PreFillService } from './pre-fill.service';

describe('PreFillService', () => {
  let service: PreFillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreFillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
