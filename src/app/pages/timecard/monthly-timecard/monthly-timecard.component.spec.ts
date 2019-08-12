import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTimecardComponent } from './monthly-timecard.component';

describe('MonthlyTimecardComponent', () => {
  let component: MonthlyTimecardComponent;
  let fixture: ComponentFixture<MonthlyTimecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyTimecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyTimecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
