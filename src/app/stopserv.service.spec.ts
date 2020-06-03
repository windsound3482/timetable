import { TestBed } from '@angular/core/testing';

import { StopservService } from './stopserv.service';

describe('StopservService', () => {
  let service: StopservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
