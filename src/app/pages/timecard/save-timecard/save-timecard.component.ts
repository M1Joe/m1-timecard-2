import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';

@Component({
  selector: 'app-save-timecard',
  templateUrl: './save-timecard.component.html',
  styleUrls: ['./save-timecard.component.scss']
})
export class SaveTimecardComponent implements OnInit {

  @Input() currentTimePeriod: CurrentTimePeriod;
  @Input() totalHoursAllActivities: number;
  @Input() totalAvailableHoursInMonth: number;
  @Input() status: string;

  @Output() requestToSaveTimecard: EventEmitter<string> = new EventEmitter();

  ngOnInit() {}

  saveTimecard() {
    this.requestToSaveTimecard.emit('DRAFT');
  }

  submitTimecard() {
    this.requestToSaveTimecard.emit('SUBMITTED');
  }


  isWeekend(day: number) {
    var date = new Date(+this.currentTimePeriod.selectedYear, +this.currentTimePeriod.selectedMonth-1, day);
    var day = date.getDay();
    return day === 0 || day === 6;
  }



}
