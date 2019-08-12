import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePeriodPickerComponent } from './time-period-picker.component';

describe('TimePeriodPickerComponent', () => {
  let component: TimePeriodPickerComponent;
  let fixture: ComponentFixture<TimePeriodPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePeriodPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePeriodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
