import { TestBed } from '@angular/core/testing';

import { TimetableservService } from './timetableserv.service';

describe('TimetableservService', () => {
  let service: TimetableservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetableservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
