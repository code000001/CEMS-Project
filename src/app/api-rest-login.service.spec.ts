import { TestBed } from '@angular/core/testing';

import { ApiRestLoginService } from './api-rest-login.service';

describe('ApiRestLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiRestLoginService = TestBed.get(ApiRestLoginService);
    expect(service).toBeTruthy();
  });
});
