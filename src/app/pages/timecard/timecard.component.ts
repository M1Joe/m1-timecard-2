import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '@shared';
import {AuthProvider, Theme} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent {

  constructor(private authService: AuthService) {}


}
