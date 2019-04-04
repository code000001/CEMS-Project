import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdViewsTrainningComponent } from './std-views-trainning.component';

describe('StdViewsTrainningComponent', () => {
  let component: StdViewsTrainningComponent;
  let fixture: ComponentFixture<StdViewsTrainningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdViewsTrainningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdViewsTrainningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
