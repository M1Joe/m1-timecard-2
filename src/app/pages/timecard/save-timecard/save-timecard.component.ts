import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { DateService } from '@shared/services/date.service';

@Component({
  selector: 'app-save-timecard',
  templateUrl: './save-timecard.component.html',
  styleUrls: ['./save-timecard.component.scss']
})
export class SaveTimecardComponent {

  @Output() requestToSaveTimecard: EventEmitter<string> = new EventEmitter();
  
  @Input() status: string;

  saveTimecard() {
    this.requestToSaveTimecard.emit('DRAFT');
  }

  submitTimecard() {
    this.requestToSaveTimecard.emit('SUBMITTED');
  }



}
