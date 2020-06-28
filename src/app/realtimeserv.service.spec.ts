import { TestBed } from '@angular/core/testing';

import { RealtimeservService } from './realtimeserv.service';

describe('RealtimeservService', () => {
  let service: RealtimeservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
