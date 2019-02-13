import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JodDetailAnnouncementComponent } from './jod-detail-announcement.component';

describe('JodDetailAnnouncementComponent', () => {
  let component: JodDetailAnnouncementComponent;
  let fixture: ComponentFixture<JodDetailAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JodDetailAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JodDetailAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
