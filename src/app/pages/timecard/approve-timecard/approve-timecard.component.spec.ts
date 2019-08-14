import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTimecardComponent } from './approve-timecard.component';

describe('ApproveTimecardComponent', () => {
  let component: ApproveTimecardComponent;
  let fixture: ComponentFixture<ApproveTimecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveTimecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTimecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
