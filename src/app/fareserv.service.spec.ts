import { TestBed } from '@angular/core/testing';

import { FareservService } from './fareserv.service';

describe('FareservService', () => {
  let service: FareservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FareservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
