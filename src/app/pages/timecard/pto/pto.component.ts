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
  
  _viewingTimecardForUser: User;
  _status: string;

  pto$: Observable<PTO>;
  
  // This component is a little buggy.
  // It loads the PTO twice because Joe couldn't figure out how to get the Status and ViewingTimecardForUser 
  // input values to both load before making the PTO call, so the app just refreshes the PTO anytime either changes.
  // When they both change, the update happens twice.

  @Input('status')
  set status(value: string) {
    console.log('value is ' + value);
    this._status = value;
    this.triggerPtoRefresh();
  }

  @Input()
  set viewingTimecardForUser(user: User) {
    console.log('viewing is ' + user.displayName);
    this._viewingTimecardForUser = user;
    this.triggerPtoRefresh();
  }

  constructor(
    public userService: UserService,
    public timecardComponent: TimecardComponent,
    public authService: AuthService
  ) {}


  triggerPtoRefresh() {
    console.log(this._status);
    if (this._status === 'APPROVED') {
      // display the status for that month
      this.pto$ = this.userService.getPtoForMonth(this.authService.getUserKey(this._viewingTimecardForUser), this.currentTimePeriod.selectedYear, this.currentTimePeriod.selectedMonth);
    } else {
      // otherwise, display the official PTO count because the current month doesn't have PTO saved in it yet.
      this.pto$ = this.userService.getOfficialPto(this.authService.getUserKey(this._viewingTimecardForUser));
    }
  }

  


}
