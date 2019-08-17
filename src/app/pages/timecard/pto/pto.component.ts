import { Component, OnInit, Input, Output, EventEmitter, getPlatform, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { DateService } from '@shared/services/date.service';
import { UserService } from '@shared/services/user.service';
import { PTO } from '@shared/models/pto.model';
import { Observable } from 'rxjs/internal/Observable';
import { TimecardComponent } from '../timecard.component';

@Component({
  selector: 'app-pto',
  templateUrl: './pto.component.html',
  styleUrls: ['./pto.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PtoComponent { //implements OnInit, OnChanges {

  
  pto$: Observable<PTO>;
  
  @Input() //userKey: string;
  set userKey(userKey: string) {
    this.getPto(userKey);
  }

  constructor(
    public userService: UserService,
    public timecardComponent: TimecardComponent
  ) {}

  getPto(userKey: string) {
    console.log('userkey is ' + userKey);
    this.pto$ = this.userService.getPto(userKey);
  }

  


}
