import { TestBed } from '@angular/core/testing';

import { ApiRestTestService } from './api-rest-test.service';

describe('ApiRestTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiRestTestService = TestBed.get(ApiRestTestService);
    expect(service).toBeTruthy();
  });
});
