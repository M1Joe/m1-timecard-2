import { Component, OnInit, Input, Output, EventEmitter, getPlatform, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { DateService } from '@shared/services/date.service';
import { UserService } from '@shared/services/user.service';
import { PTO } from '@shared/models/pto.model';
import { Observable } from 'rxjs/internal/Observable';
import { TimecardComponent } from '../timecard.component';
import { User } from '@shared/models/user.model';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-pto',
  templateUrl: './pto.component.html',
  styleUrls: ['./pto.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PtoComponent { //implements OnInit, OnChanges {

  @Input() currentTimePeriod: CurrentTimePeriod;

  pto$: Observable<PTO>;
  
  @Input()
  set currentUser(user: User) {
    this.pto$ = null;
    this.getPto(user);
  }

  constructor(
    public userService: UserService,
    public timecardComponent: TimecardComponent,
    public authService: AuthService
  ) {}

  getPto(user: User) {
    //this.pto$ = this.userService.getPtoForMonth(userKey, this.currentTimePeriod.selectedYear, this.currentTimePeriod.selectedMonth);
    this.pto$ = this.userService.getOfficialPto(this.authService.getUserKey(user));
  }

  


}
