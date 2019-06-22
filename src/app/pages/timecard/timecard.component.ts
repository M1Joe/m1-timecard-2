import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '@shared';
import {AuthProvider, Theme} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent implements OnInit {

  constructor(private authService: AuthService) {}

  selectedMonth = "4";
  selectedYear = "2019";

  ngOnInit(): void {
    
  }

  requestToLoadTimecard($event) {
    console.log($event.selectedMonth + $event.selectedYear);
  }

}
