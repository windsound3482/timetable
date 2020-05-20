import { TestBed } from '@angular/core/testing';

import { GetinfoService } from './getinfo.service';

describe('GetinfoService', () => {
  let service: GetinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
