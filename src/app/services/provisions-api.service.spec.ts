import { TestBed } from '@angular/core/testing';

import { ProvisionsApiService } from './provisions-api.service';

describe('ProvisionsApiService', () => {
  let service: ProvisionsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvisionsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
