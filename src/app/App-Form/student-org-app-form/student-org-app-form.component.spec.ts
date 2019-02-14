import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOrgAppFormComponent } from './student-org-app-form.component';

describe('StudentOrgAppFormComponent', () => {
  let component: StudentOrgAppFormComponent;
  let fixture: ComponentFixture<StudentOrgAppFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentOrgAppFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOrgAppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
