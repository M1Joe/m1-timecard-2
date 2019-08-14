import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { DateService } from '@shared/services/date.service';

@Component({
  selector: 'app-timecard-stats',
  templateUrl: './timecard-stats.component.html',
  styleUrls: ['./timecard-stats.component.scss']
})
export class TimecardStatsComponent implements OnInit {

  @Input() currentTimePeriod: CurrentTimePeriod;
  @Input() totalHoursAllActivities: number;
  @Input() totalAvailableHoursInMonth: number;
  @Input() status: string;

  constructor(public dateService: DateService) {}
  ngOnInit() {}

  isWeekend(day: number) {
    return this.dateService.isWeekend(+this.currentTimePeriod.selectedYear, +this.currentTimePeriod.selectedMonth, day);
  }



}
