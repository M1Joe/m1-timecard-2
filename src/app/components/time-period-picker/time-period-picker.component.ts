import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-period-picker',
  templateUrl: './time-period-picker.component.html',
  styleUrls: ['./time-period-picker.component.scss']
})
export class TimePeriodPickerComponent implements OnInit {

  constructor() { }

  @Input() selectedMonth: string;
  @Input() selectedYear: string;
  @Output() requestToLoadTimecard: EventEmitter<object> = new EventEmitter();


  ngOnInit() {
    console.log(this.selectedMonth);
    console.log(this.selectedYear);
  }

  loadTimecard() {
    this.requestToLoadTimecard.emit({selectedMonth: this.selectedMonth, selectedYear: this.selectedYear});
  }

}
