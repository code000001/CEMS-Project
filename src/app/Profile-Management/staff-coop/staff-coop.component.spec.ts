import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCoopComponent } from './staff-coop.component';

describe('StaffCoopComponent', () => {
  let component: StaffCoopComponent;
  let fixture: ComponentFixture<StaffCoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffCoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
