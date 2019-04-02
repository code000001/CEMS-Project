import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailAnnouncementComponent } from './job-detail-announcement.component';

describe('JobDetailAnnouncementComponent', () => {
  let component: JobDetailAnnouncementComponent;
  let fixture: ComponentFixture<JobDetailAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetailAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
