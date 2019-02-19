import { TestBed } from '@angular/core/testing';

import { AppFormService } from './app-form.service';

describe('AppFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppFormService = TestBed.get(AppFormService);
    expect(service).toBeTruthy();
  });
});
