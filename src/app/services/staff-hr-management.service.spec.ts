import { TestBed } from '@angular/core/testing';

import { StaffHrManagementService } from './staff-hr-management.service';

describe('StaffHrManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaffHrManagementService = TestBed.get(StaffHrManagementService);
    expect(service).toBeTruthy();
  });
});
