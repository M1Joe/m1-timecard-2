import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTimecardComponent } from './review-timecard.component';

describe('ReviewTimecardComponent', () => {
  let component: ReviewTimecardComponent;
  let fixture: ComponentFixture<ReviewTimecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTimecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTimecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
