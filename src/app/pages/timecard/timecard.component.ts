import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';

import {AuthProvider, Theme} from 'ngx-auth-firebaseui';
import { UserService } from '@shared/services/user.service';
import { AuthService } from '@shared/services/auth.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { MonthlyTimecard } from '@shared/models/monthly-timecard.model';
import { MonthlyTimecardComponent } from './monthly-timecard/monthly-timecard.component';
import { DateService } from '@shared/services/date.service';
import { User } from '@shared/models/user.model';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private userService: UserService, 
    private dateService: DateService
  ) {}

  @ViewChild(MonthlyTimecardComponent, {static: false}) monthlyTimecardComponent: MonthlyTimecardComponent;
  
  //selectedMonth = "4";
  //selectedYear = "2019";

  currentTimePeriod$: Observable<CurrentTimePeriod>; 
  currentTimePeriod: CurrentTimePeriod;
  daysInMonth: number;

  //the current user of the application
  currentUser: User;
  //userKey: string;
  
  viewingTimecardForUser: User;
  //viewTimecardForUserKey: string; //the user who we are currently viewing

  ngOnInit(): void {
    // get the current user and set the viewingTimecard for that user to the same person.
    this.currentUser = this.authService.getUser();
    this.viewingTimecardForUser = this.currentUser;

    // get the time period from Firebase.
    this.currentTimePeriod$ = this.userService.getCurrentTimePeriod(this.authService.getUserKey());

    // determine how many days are in the current month.
    this.currentTimePeriod$.pipe(take(1)).subscribe(result => {
      this.currentTimePeriod = result;
      this.daysInMonth = new Date(+this.currentTimePeriod.selectedYear, +this.currentTimePeriod.selectedMonth, 0).getDate();
      this.requestToLoadTimecard(this.currentTimePeriod);
    }); 

  }

  requestToLoadTimecard(currentTimePeriod: CurrentTimePeriod) {
    // change the current timeperiod to whatever the user suggested.
    this.currentTimePeriod = currentTimePeriod;
    
    // set the favorite time period to the current user.
    this.userService.setCurrentTimePeriod(this.authService.getUserKey(this.currentUser), currentTimePeriod);

    // initiate the form for whichever user we're currently viewing
    this.monthlyTimecardComponent.initForm(this.authService.getUserKey(this.viewingTimecardForUser), this.currentTimePeriod);
  }

  requestToSaveTimecard(status: string) {
    var timecard: MonthlyTimecard = this.monthlyTimecardComponent.timecardForm.value;
    timecard.status = status;
    // update the value of status in the form below.
    this.monthlyTimecardComponent.timecardForm.patchValue(timecard);

    // save the timecard
    this.userService.saveTimecard(this.authService.getUserKey(this.viewingTimecardForUser), this.currentTimePeriod.selectedYear, this.currentTimePeriod.selectedMonth, timecard);
  }

  requestToApproveTimecard(event: any) {
    var timecard: MonthlyTimecard = this.monthlyTimecardComponent.timecardForm.value;
    timecard.status = event.status;
    this.userService.savePto(this.authService.getUserKey(event.user), event.pto);
    timecard.pto = event.pto;
    this.userService.saveTimecard(this.authService.getUserKey(event.user), this.currentTimePeriod.selectedYear, this.currentTimePeriod.selectedMonth, timecard);
  }


  requestToLoadTimecardForUser(user: User) {
    this.viewingTimecardForUser = user;
    this.monthlyTimecardComponent.initForm(this.authService.getUserKey(this.viewingTimecardForUser), this.currentTimePeriod);
  }


  /**
   * HELPER FUNCTIONS BELOW
   */ 

  isWeekend(day: number) {
    return this.dateService.isWeekend(+this.currentTimePeriod.selectedYear, +this.currentTimePeriod.selectedMonth, day);
  }

  totalHoursForActivity(index: number) {
    var totalHours = 0;

    Object.entries(this.monthlyTimecardComponent.timecardForm.value.activities[index]).forEach(
      ([key, value]) => {
        if (key !== "chargeCode" && key.charAt(0) === 'd' && key.length === 3) {
          totalHours = totalHours + +value;
        }
      }
    );    
    return totalHours;
  }

  totalHoursAllActivities() {
    if (!this.monthlyTimecardComponent || !this.monthlyTimecardComponent.timecardForm) {
      return 0;
    }

    var grandTotal = 0;
    for (let index = 0; index < this.monthlyTimecardComponent.timecardForm.value.activities.length; index++) {
    //for (let index of this.timecardForm.value.activities) {
      grandTotal = grandTotal + this.totalHoursForActivity(index);
    }
    return grandTotal;
  }

  totalAvailableHoursInMonth() {
    var totalHoursAvailable = 0;
    for (let day = 1; day <= this.daysInMonth; day++) {
      if (!this.isWeekend(day)) {
        totalHoursAvailable = totalHoursAvailable + 8;
      }
    }
    return totalHoursAvailable;
  }

  getStatus(): string {
    var timecard: MonthlyTimecard;
    if (this.monthlyTimecardComponent && this.monthlyTimecardComponent.timecardForm) {
      timecard = this.monthlyTimecardComponent.timecardForm.value;
      return timecard.status;
    } else {
      return '';
    }
  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
