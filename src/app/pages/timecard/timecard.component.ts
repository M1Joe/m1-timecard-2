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


@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private dateService: DateService) {
  
  }

  //@ViewChild('timecardForm', {static: false}) timecardForm: FormGroup;
  @ViewChild(MonthlyTimecardComponent, {static: false}) monthlyTimecardComponent: MonthlyTimecardComponent;
  
  selectedMonth = "4";
  selectedYear = "2019";
  userKey: string;
  currentTimePeriod$: Observable<CurrentTimePeriod>; 
  currentTimePeriod: CurrentTimePeriod;
  daysInMonth: number;

  ngOnInit(): void {
    this.userKey = this.authService.getUserKey();

    console.log(this.userKey);
    this.currentTimePeriod$ = this.userService.getCurrentTimePeriod(this.userKey);

    this.currentTimePeriod$.subscribe(result => {
      this.currentTimePeriod = result;
      this.daysInMonth = new Date(+this.currentTimePeriod.selectedYear, +this.currentTimePeriod.selectedMonth, 0).getDate();
      
    });  //TODO: Unsubscribe

  }

  requestToLoadTimecard(currentTimePeriod: CurrentTimePeriod) {
    this.currentTimePeriod = currentTimePeriod;
    this.userService.setCurrentTimePeriod(this.userKey, currentTimePeriod);
  }

  requestToSaveTimecard(status: string) {
    console.log('user requested to save timecard');
    var timecard: MonthlyTimecard = this.monthlyTimecardComponent.timecardForm.value;
    console.log(timecard);
    timecard.status = status;
    this.monthlyTimecardComponent.timecardForm.patchValue(timecard);
    this.userService.saveTimecard(this.authService.getUserKey(), this.currentTimePeriod.selectedYear, this.currentTimePeriod.selectedMonth, timecard);
  }

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
    if (!this.monthlyTimecardComponent) {
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


  //TODO: Figure out why this cuases error: Expression has changed after it was checked. Previous value:
  getStatus(): string {
    
    var timecard: MonthlyTimecard;
    if (this.monthlyTimecardComponent && this.monthlyTimecardComponent.timecardForm) {
      timecard = this.monthlyTimecardComponent.timecardForm.value;
      return timecard.status;
    } else {
      return '';
    }
    
  }

}
