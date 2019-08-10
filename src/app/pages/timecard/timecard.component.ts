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
  userKey: string;
  currentTimePeriod$: Observable<CurrentTimePeriod>; 
  currentTimePeriod: CurrentTimePeriod;

  ngOnInit(): void {

    this.userKey = this.authService.getUserKey();
    this.currentTimePeriod$ = this.userService.getCurrentTimePeriod(this.userKey);

    this.currentTimePeriod$.subscribe(res => console.log(res));
    
  }

  requestToLoadTimecard($event) {
    console.log($event);
    this.userService.setCurrentTimePeriod(this.userKey, $event);
  }


}
