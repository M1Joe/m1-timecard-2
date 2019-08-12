import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';

@Component({
  selector: 'app-time-period-picker',
  templateUrl: './time-period-picker.component.html',
  styleUrls: ['./time-period-picker.component.scss']
})
export class TimePeriodPickerComponent implements OnInit {

  @Input() currentTimePeriod: CurrentTimePeriod;
  @Output() requestToLoadTimecard: EventEmitter<object> = new EventEmitter();
  selectedMonth: string;
  selectedYear: string;

  ngOnInit() {
    this.selectedYear = this.currentTimePeriod.selectedYear
    this.selectedMonth = this.currentTimePeriod.selectedMonth;
  }

  loadTimecard() {
    this.requestToLoadTimecard.emit({selectedMonth: this.selectedMonth, selectedYear: this.selectedYear});
  }

}
