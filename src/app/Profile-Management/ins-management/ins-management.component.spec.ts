import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsManagementComponent } from './ins-management.component';

describe('InsManagementComponent', () => {
  let component: InsManagementComponent;
  let fixture: ComponentFixture<InsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
