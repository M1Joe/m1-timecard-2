import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-monthly-timecard',
  templateUrl: './monthly-timecard.component.html',
  styleUrls: ['./monthly-timecard.component.scss']
})
export class MonthlyTimecardComponent implements OnInit {

  timecardForm: FormGroup;
  dataModel: any; //active model
  storeData: any;  //save to disk model
  chargeCodes$: Observable<string[]>;

  activitiesFormArray: FormArray;

  // @Input()
  // currentTimePeriod: CurrentTimePeriod;

  currentTimePeriod: CurrentTimePeriod;

  @Input() set curTimePer(value: CurrentTimePeriod) {
    this.currentTimePeriod = value;
    console.log('current time period reset');
    this.initForm();
    
  }

  constructor(private userService: UserService, private authService: AuthService, private _fb: FormBuilder) { }

  showValue() {
    return this.timecardForm.getRawValue();
  }

  showSavedValue() {
    return this.dataModel;
  }

  saveForm() {
    //save form values to ojbect and reset the form
    this.storeData = this.timecardForm.getRawValue();

    //TODO REMOVE HARD CODED DATE
    this.userService.saveTimecard(this.authService.getUserKey(), this.currentTimePeriod.selectedYear, this.currentTimePeriod.selectedMonth, this.timecardForm.value);

  }

  addActivity() {
    this.activitiesFormArray.push(this.activity);
  }

  removeActivity(idx: number) {
    this.activitiesFormArray.removeAt(idx);
  }

  loadForm(data) {
    //create activities array first
    // console.log('load form data');
    // if (data === null) {
    //   //there is nothing in Firebase at all for this month, so give the user a new activity.
    //   this.activitiesFormArray.push(this.activity);
    // } else {
      
    //TODO: Nice to have - automatically add a row for the user when one doesn't exist.  
    
    if (data.activities && data.activities.length && data.activities.length > 0) {
      for (let activity = 0; activity < data.activities.length; activity++) {
        this.activitiesFormArray.push(this.activity);
      }
    }
    //   } else {
    //     // there is something in Firebase, just no activities
    //     console.log('caught you error');
    //     this.activitiesFormArray.push(this.activity);
    //   }
    // }
    
    
    //once we setup the form with all the arrays and such, we cna just
    //patch the form:
    this.timecardForm.patchValue(data);
  }

  loadData(): void {
    //this.userService.getTimecard(this.authService.getUserKey(), "2019", "11").subscribe(
    this.userService.getTimecard(this.authService.getUserKey(), this.currentTimePeriod.selectedYear, this.currentTimePeriod.selectedMonth).pipe(take(1)).subscribe(
      results => {
        if (results !== null) {
          this.loadForm(results);
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

    this.initForm();
    
  }

  initForm() {
    this.dataModel = Object.create(null);

    this.timecardForm = this._fb.group({
      note: ['', [Validators.required]],
      activities: this._fb.array([
      ])
    });


    this.activitiesFormArray = this.timecardForm.get("activities") as FormArray;

    //subscribe to value changes on form
    this.timecardForm.valueChanges.subscribe(data => {
      this.dataModel = data;
    });

    this.loadData();
  }
}
