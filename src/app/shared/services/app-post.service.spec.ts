import { TestBed } from '@angular/core/testing';

import { AppPostService } from './app-post.service';

describe('AppPostService', () => {
  let service: AppPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
