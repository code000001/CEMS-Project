import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadInsComponent } from './download-ins.component';

describe('DownloadInsComponent', () => {
  let component: DownloadInsComponent;
  let fixture: ComponentFixture<DownloadInsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadInsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
