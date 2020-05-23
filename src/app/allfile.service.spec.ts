import { TestBed } from '@angular/core/testing';

import { AllfileService } from './allfile.service';

describe('AllfileService', () => {
  let service: AllfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
