import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { first, take } from 'rxjs/operators';
import { MonthlyTimecard } from '@shared/models/monthly-timecard.model';

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

  //for spinner in HTML
  loading = true;

  @Input() set curTimePer(value: CurrentTimePeriod) {
    this.loading = true;
    //In order to find the number of days in a month, you need to get the 'date' of the 0th day of the next month.
    this.daysInMonth = new Date(+value.selectedYear, +value.selectedMonth, 0).getDate();
    console.log("days in month is " + this.daysInMonth);
    this.currentTimePeriod = value;
    this.initForm();
    
  }

  constructor(private userService: UserService, private authService: AuthService, private _fb: FormBuilder) { }

  showValue() {
    return this.timecardForm.getRawValue();
  }

  saveForm() {
    var timecard: MonthlyTimecard = this.timecardForm.value;
    //this.timecardForm.status = 'DRAFT'
    timecard.status = 'DRAFT';
    this.timecardForm.patchValue(timecard);

    this.userService.saveTimecard(this.authService.getUserKey(), this.currentTimePeriod.selectedYear, this.currentTimePeriod.selectedMonth, this.timecardForm.value);
  }

  submitForm() {
    var timecard: MonthlyTimecard = this.timecardForm.value;
    timecard.status = 'SUBMITTED';
    this.timecardForm.patchValue(timecard);
    this.userService.saveTimecard(this.authService.getUserKey(), this.currentTimePeriod.selectedYear, this.currentTimePeriod.selectedMonth, timecard);

  }

  addActivity() {
    this.activitiesFormArray.push(this.activity);
  }

  removeActivity(idx: number) {
    this.activitiesFormArray.removeAt(idx);
  }

  loadForm(data) {
  

    //TODO: Nice to have - automatically add a row for the user when one doesn't exist.  
    
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
    return this.disableSaveAndSubmit;
  }

  loadData(): void {
    console.log('loadData Called');

    this.userService.getTimecard(this.authService.getUserKey(), this.currentTimePeriod.selectedYear, this.currentTimePeriod.selectedMonth).pipe(take(1)).subscribe(
      results => {
        if (results !== null) {
          if (results.status === 'SUBMITTED') {
            this.disableSaveAndSubmit = true;
          }
          this.loadForm(results);
        } else {
          //show form to user
          this.loading = false;
        }
      }
    );

      //TODO: UNSUBSCRIBE
  }


  //get functions cannot have parameters...
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
    this.chargeCodes$ = this.userService.getUserChargeCodes(this.authService.getUserKey());
    
  }

  initForm() {

    this.timecardForm = this._fb.group({
      note: ['', [Validators.required]],
      status: [{value: 'DRAFT', disabled: true}],
      activities: this._fb.array([
      ])
    });

    this.activitiesFormArray = this.timecardForm.get("activities") as FormArray;

    this.loadData();
  }

  isWeekend(day: number) {
    var date = new Date(+this.currentTimePeriod.selectedYear, +this.currentTimePeriod.selectedMonth-1, day);
    var day = date.getDay();
    return day === 0 || day === 6;
  }
}
