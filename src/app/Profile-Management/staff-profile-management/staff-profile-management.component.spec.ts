import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProfileManagementComponent } from './staff-profile-management.component';

describe('StaffProfileManagementComponent', () => {
  let component: StaffProfileManagementComponent;
  let fixture: ComponentFixture<StaffProfileManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffProfileManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
