import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { DateService } from '@shared/services/date.service';

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

  constructor(public dateService: DateService) {}
  ngOnInit() {}

  saveTimecard() {
    this.requestToSaveTimecard.emit('DRAFT');
  }

  submitTimecard() {
    this.requestToSaveTimecard.emit('SUBMITTED');
  }


  isWeekend(day: number) {
    return this.dateService.isWeekend(+this.currentTimePeriod.selectedYear, +this.currentTimePeriod.selectedMonth, day);
  }



}
