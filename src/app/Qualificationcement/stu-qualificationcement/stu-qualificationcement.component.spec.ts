import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuQualificationcementComponent } from './stu-qualificationcement.component';

describe('StuQualificationcementComponent', () => {
  let component: StuQualificationcementComponent;
  let fixture: ComponentFixture<StuQualificationcementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuQualificationcementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuQualificationcementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
