import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { AuthService } from '@shared/services/auth.service';
import { MonthlyTimecard } from '@shared/models/monthly-timecard.model';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
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
  chargeCodes$: Observable<string[]>;
  
  monthlyTimeCard: MonthlyTimecard = new MonthlyTimecard();

  constructor(private userService: UserService, private authService: AuthService, public formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      note: ['']

    });
  }

  ngOnInit() {
    this.chargeCodes$ = this.userService.getUserChargeCodes(this.authService.getUserKey());

    //TODO do not hard code month and year
    this.monthlyTimecard$ = this.userService.getTimecard(this.authService.getUserKey(), '2019', '10').pipe(
      tap(results => {
        console.log(results.note);
        this.form.patchValue(results);
      })
    );

    this.monthlyTimecard$.subscribe(result => console.log('res' + result));
    
  }

  onSubmit(form: NgForm) {
    
    this.monthlyTimeCard.note = form.value.note;
    this.userService.saveTimecard(this.authService.getUserKey(), "2019", "10", this.monthlyTimeCard);
  }

  addActivity() {
    console.log('add activity' + this.monthlyTimeCard);
    this.monthlyTimeCard.activities.push(new Activity);
  }

  // isMonthlyTimeCardDefined() {
    // Firebase won't just let you get an observable as a single item.
    // To get around that, the service returns a list.  
    // Once the list is defined, grab the first item out of the list.
    // This is totally stupid, but it works.
  //   return this.monthlyTimecardList[0];
  // }
}
