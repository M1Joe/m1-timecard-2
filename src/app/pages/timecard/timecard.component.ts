import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {AuthProvider, Theme} from 'ngx-auth-firebaseui';
import { UserService } from '@shared/services/user.service';
import { AuthService } from '@shared/services/auth.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';


@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService) {
  
  }

  selectedMonth = "4";
  selectedYear = "2019";
  userDisplayName: string;
  currentTimePeriodList: CurrentTimePeriod[];  //because firebase won't let you just get a single object...
  currentTimePeriod: CurrentTimePeriod;
  ngOnInit(): void {

    this.userDisplayName = this.authService.getDisplayName();
    this.currentTimePeriodList = this.userService.getUserPreference(this.userDisplayName, 'currentTimePeriod');
    this.currentTimePeriod = this.currentTimePeriodList[0];
    
  }

  requestToLoadTimecard($event) {
    this.userService.updateUserPreference(this.userDisplayName, 'currentTimePeriod', $event);
  }

  isCurrentTimePeriodDefined() {
    // Firebase won't just let you get an observable as a single item.
    // To get around that, the service returns a list.  
    // Once the list is defined, grab the first item out of the list.
    // This is totally stupid, but it works.
    return this.currentTimePeriodList[0];
  }

}
