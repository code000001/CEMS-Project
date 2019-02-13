import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuQualifyingStatusComponent } from './stu-qualifying-status.component';

describe('StuQualifyingStatusComponent', () => {
  let component: StuQualifyingStatusComponent;
  let fixture: ComponentFixture<StuQualifyingStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuQualifyingStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuQualifyingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
