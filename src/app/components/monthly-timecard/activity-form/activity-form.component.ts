import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '@shared/services/user.service';
import { AuthService } from '@shared/services/auth.service';
import { Activity } from '@shared/models/activity.model';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  
  chargeCodes$: Observable<string[]>;
  
  @Input('group') activityGroup: FormGroup;

  @Input('activity') activity: Activity;

  constructor (
    private userService: UserService, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.chargeCodes$ = this.userService.getUserChargeCodes(this.authService.getUserKey());
    console.log('act' + this.activity);
    this.activityGroup.patchValue(this.activity);
  }

  
  

}
