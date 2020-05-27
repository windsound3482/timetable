import { TestBed } from '@angular/core/testing';

import { CalendarservService } from './calendarserv.service';

describe('CalendarservService', () => {
  let service: CalendarservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
