import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffTrainingManagementComponent } from './staff-training-management.component';

describe('StaffTrainingManagementComponent', () => {
  let component: StaffTrainingManagementComponent;
  let fixture: ComponentFixture<StaffTrainingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffTrainingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffTrainingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
