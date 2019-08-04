import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-period-picker',
  templateUrl: './time-period-picker.component.html',
  styleUrls: ['./time-period-picker.component.scss']
})
export class TimePeriodPickerComponent implements OnInit {

  constructor() { }

  @Input() currentTimePeriod: any;
  // @Input()selectedYear: string;
  // @Input()selectedMonth: string;
  @Output() requestToLoadTimecard: EventEmitter<object> = new EventEmitter();
  selectedMonth: string;
  selectedYear: string;

  ngOnInit() {
    this.selectedYear = this.currentTimePeriod['selectedYear']
    this.selectedMonth = this.currentTimePeriod['selectedMonth']
    console.log(this.selectedMonth);
    console.log(this.selectedYear);
  }

  loadTimecard() {
    this.requestToLoadTimecard.emit({selectedMonth: this.selectedMonth, selectedYear: this.selectedYear});
  }

}
