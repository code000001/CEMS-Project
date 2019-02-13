import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduProfileManagementComponent } from './edu-profile-management.component';

describe('EduProfileManagementComponent', () => {
  let component: EduProfileManagementComponent;
  let fixture: ComponentFixture<EduProfileManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduProfileManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduProfileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
