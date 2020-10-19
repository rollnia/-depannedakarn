import { TestBed } from '@angular/core/testing';

import { AppGetService } from './app-get.service';

describe('AppGetService', () => {
  let service: AppGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
