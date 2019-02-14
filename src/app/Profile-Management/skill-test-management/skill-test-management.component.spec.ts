import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTestManagementComponent } from './skill-test-management.component';

describe('SkillTestManagementComponent', () => {
  let component: SkillTestManagementComponent;
  let fixture: ComponentFixture<SkillTestManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillTestManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
