import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { first, take } from 'rxjs/operators';
import { MonthlyTimecard } from '@shared/models/monthly-timecard.model';
import { Activity } from '@shared/models/activity.model';
import { DateService } from '@shared/services/date.service';

@Component({
  selector: 'app-monthly-timecard',
  templateUrl: './monthly-timecard.component.html',
  styleUrls: ['./monthly-timecard.component.scss']
})
export class MonthlyTimecardComponent implements OnInit {

  timecardForm: FormGroup;
  chargeCodes$: Observable<string[]>;
  activitiesFormArray: FormArray;
  currentTimePeriod: CurrentTimePeriod;
  disableSaveAndSubmit: boolean;
  daysInMonth = 31;

  userKey: string;

  //@Output() requestToSaveTimecard: EventEmitter<null> = new EventEmitter();

  //for spinner in HTML
  loading = true;

  //@Input() CurrentTimePeriod: CurrentTimePeriod;

  // @Input() set curTimePer(value: CurrentTimePeriod) {
  
  //   this.currentTimePeriod = value;
  //   this.initForm(this.authService.getUserKey());  
  // }


  constructor(
    private authService: AuthService, 
    private dateService: DateService,
    private userService: UserService, 
    private _fb: FormBuilder
  ) { }

  showValue() {
    return this.timecardForm.getRawValue();
  }

  addActivity() {
    this.activitiesFormArray.push(this.activity);
  }

  removeActivity(idx: number) {
    this.activitiesFormArray.removeAt(idx);
  }

  loadForm(data: MonthlyTimecard) {
  
    if (data !== null) {
      if (data.status === 'SUBMITTED') {
        this.disableSaveAndSubmit = true;
      } else {
        this.disableSaveAndSubmit = false;
      }
      
    } else {
      // add a blank row when one doesn't exist.
      data = {status: 'DRAFT', activities : [{'chargeCode': ''}], note: ''};
    }
    
    if (data.activities && data.activities.length && data.activities.length > 0) {
      for (let activity = 0; activity < data.activities.length; activity++) {
        this.activitiesFormArray.push(this.activity);
      }
    }

    //once we setup the form with all the arrays and such, we can just patch the form:
    this.timecardForm.patchValue(data);

    //show form to user
    this.loading = false;
  }

  isSaveAndSubmitDisabled() {
    return this.timecardForm.value.status !== 'SUBMITTED';
    //return this.disableSaveAndSubmit;
  }

  loadData(): void {
    this.userService.getTimecard(this.userKey, this.currentTimePeriod.selectedYear, this.currentTimePeriod.selectedMonth).pipe(take(1)).subscribe(
      results => {
        this.loadForm(results);
      }
    );
  }


  get activity(): FormGroup {
    return this._fb.group({
      chargeCode: '',
      d01: '',
      d02: '',
      d03: '',
      d04: '',
      d05: '',
      d06: '',
      d07: '',
      d08: '',
      d09: '',
      d10: '',
      d11: '',
      d12: '',
      d13: '',
      d14: '',
      d15: '',
      d16: '',
      d17: '',
      d18: '',
      d19: '',
      d20: '',
      d21: '',
      d22: '',
      d23: '',
      d24: '',
      d25: '',
      d26: '',
      d27: '',
      d28: '',
      d29: '',
      d30: '',
      d31: '',

    })
  }

  ngOnInit() {
    //this.userKey = this.authService.getUserKey();
  }

  /**
   * 
   * @param userKey the key of the user who we want to view the timecard for.  
   * For most users, this is the user themself, but approvers can view any user's timecard.
   */
  initForm(userKey: string, currentTimePerdiod: CurrentTimePeriod) { 
    
    this.userKey = userKey;
    this.currentTimePeriod = currentTimePerdiod;

    //In order to find the number of days in a month, you need to get the 'date' of the 0th day of the next month.
    this.daysInMonth = new Date(+this.currentTimePeriod.selectedYear, +this.currentTimePeriod.selectedMonth, 0).getDate();
    
    this.chargeCodes$ = this.userService.getUserChargeCodes(this.userKey);

    this.timecardForm = this._fb.group({
      note: [''],
      status: [{value: 'DRAFT'}],
      activities: this._fb.array([
      ])
    });

    this.activitiesFormArray = this.timecardForm.get("activities") as FormArray;

    this.loadData();
  }

  isWeekend(day: number) {
    return this.dateService.isWeekend(+this.currentTimePeriod.selectedYear, +this.currentTimePeriod.selectedMonth, day);
  }

  getDay(day: number): string {
    return this.dateService.getDay(+this.currentTimePeriod.selectedYear, +this.currentTimePeriod.selectedMonth, day);
  }

  totalHoursForActivity(index: number) {
    var totalHours = 0;

    Object.entries(this.timecardForm.value.activities[index]).forEach(
      ([key, value]) => {
        if (key !== "chargeCode" && key.charAt(0) === 'd' && key.length === 3) {
          totalHours = totalHours + +value;
        }
      }
    );    
    return totalHours;
  }

  getHours(day: string): number {
    var hours = 0;
    for (let index in this.timecardForm.value.activities) {
      hours = hours + +this.timecardForm.value.activities[index][day]
    }
    return hours;
  }

  shouldFocus(day: number, activityIndex: number) {
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1; //months from 1-12
    var currentDay = date.getDate();

    return this.timecardForm.value.status === 'DRAFT' 
          && +this.currentTimePeriod.selectedMonth === currentMonth 
          && +this.currentTimePeriod.selectedYear === currentYear
          && day === currentDay
          && activityIndex === 0;
    
  }
 

}
