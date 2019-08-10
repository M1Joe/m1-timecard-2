import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { AuthService } from '@shared/services/auth.service';
import { MonthlyTimecard } from '@shared/models/monthly-timecard.model';
import { FormBuilder, FormGroup, NgForm, FormArray } from '@angular/forms';
import { Activity } from '@shared/models/activity.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-monthly-timecard',
  templateUrl: './monthly-timecard.component.html',
  styleUrls: ['./monthly-timecard.component.scss']
})
export class MonthlyTimecardComponent implements OnInit {
  
  
  public form: FormGroup;
  monthlyTimecard$: Observable<MonthlyTimecard>;

  monthlyTimeCard: MonthlyTimecard = new MonthlyTimecard();

  constructor(private userService: UserService, private authService: AuthService, public formBuilder: FormBuilder) { 
    
  }

  get aliases() {
    return this.form.get('activities') as FormArray;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      activities: this.formBuilder.array([
         this.formBuilder.control('')
      ]),
      note: [''] 
      // status: [''],
    });

    this.addActivity();


    //TODO do not hard code month and year
    
    
    this.monthlyTimecard$ = this.userService.getTimecard(this.authService.getUserKey(), '2019', '11').pipe(
      tap(results => {
        // this.form.patchValue(results.note);
        // this.form.patchValue({activities: results.activities});
        // console.log(results.note);
        // console.log(results.activities);
        // this.form.patchValue(results);
        this.form.controls['note'].patchValue(results.note);

      })
    );    
  }

  initActivity() {
    return this.formBuilder.group({
      name: '',
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
    });
  }

  addActivity() {
    const activityArray = <FormArray>this.form.controls['activities'];
    const newActivity = this.initActivity();
    activityArray.push(newActivity);
  }

  removeActivity(idx: number) {
    const activityArray = <FormArray>this.form.controls['activities'];
    activityArray.removeAt(idx);
  }
  
  onSubmit(form: NgForm) {
    console.log('value is: ' + this.form.value);
    console.log('value is: ' + this.form.value.note);
    console.log('value is: ' + this.form.value.activities[1]);
    
    
    this.monthlyTimeCard.note = form.value.note;
    this.userService.saveTimecard(this.authService.getUserKey(), "2019", "11", this.form.value);
  }

  // addActivity() {
  //   console.log('add activity' + this.monthlyTimeCard);
  //   this.monthlyTimeCard.activities.push(new Activity);
  // }

  // isMonthlyTimeCardDefined() {
    // Firebase won't just let you get an observable as a single item.
    // To get around that, the service returns a list.  
    // Once the list is defined, grab the first item out of the list.
    // This is totally stupid, but it works.
  //   return this.monthlyTimecardList[0];
  // }
}
