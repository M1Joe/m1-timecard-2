import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { AuthService } from '@shared/services/auth.service';
import { MonthlyTimecard } from '@shared/models/monthly-timecard.model';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Activity } from '@shared/models/activity.model';

@Component({
  selector: 'app-monthly-timecard',
  templateUrl: './monthly-timecard.component.html',
  styleUrls: ['./monthly-timecard.component.scss']
})
export class MonthlyTimecardComponent implements OnInit {
  public form: FormGroup;
  monthlyTimecardList: MonthlyTimecard[];
  chargeCodes: string[];
  
  monthlyTimeCard: MonthlyTimecard = new MonthlyTimecard();

  constructor(private userService: UserService, private authService: AuthService, public formBuilder: FormBuilder) { 
    this.form = formBuilder.group({
      note: ''

    });
  }

  ngOnInit() {
    this.chargeCodes = this.userService.getUserChargeCodes(this.authService.getDisplayName());

    //TODO do not hard code month and year
    this.monthlyTimecardList = this.userService.getTimecard(this.authService.getDisplayName(), '2019', '10');
    
  }

  onSubmit(form: NgForm) {
    
    this.monthlyTimeCard.note = form.value.note;
    this.userService.saveTimecard(this.authService.getDisplayName(), "2019", "10", this.monthlyTimeCard);
  }

  addActivity() {
    console.log('add activity' + this.monthlyTimeCard);
    this.monthlyTimeCard.activities.push(new Activity);
  }

  isMonthlyTimeCardDefined() {
    // Firebase won't just let you get an observable as a single item.
    // To get around that, the service returns a list.  
    // Once the list is defined, grab the first item out of the list.
    // This is totally stupid, but it works.
    return this.monthlyTimecardList[0];
  }
}
