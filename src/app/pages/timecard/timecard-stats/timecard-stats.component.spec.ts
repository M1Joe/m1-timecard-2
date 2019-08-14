import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimecardStatsComponent } from './timecard-stats.component';

describe('TimecardStatsComponent', () => {
  let component: TimecardStatsComponent;
  let fixture: ComponentFixture<TimecardStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimecardStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimecardStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
