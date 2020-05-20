import { TestBed } from '@angular/core/testing';

import { PostfileService } from './postfile.service';

describe('PostfileService', () => {
  let service: PostfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
