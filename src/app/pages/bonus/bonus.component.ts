import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { AuthService } from '@shared/services/auth.service';
import { Observable, of } from 'rxjs';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { MonthlyTimecard } from '@shared/models/monthly-timecard.model';
import { DateService } from '@shared/services/date.service';
import { User } from '@shared/models/user.model';
import { take } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BonusData } from '@shared/models/bonus-data.model';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {

  pto$: Observable<any>;
  bonusData$: Observable<BonusData>;
  existingPtoBalance: string;
  existingptoAsOf: string;
  public form: FormGroup;

  previousPtoEstimatedWillUse: string;
  previousPtoEstimatedWillEarn: string;
  previousPtoBalance: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.form = this.formBuilder.group({
      ptoBalance: [this.existingPtoBalance, Validators.compose([Validators.required])],
      ptoEstimatedWillEarn: ['', Validators.compose([Validators.required])],
      ptoEstimatedWillUse: ['', Validators.compose([Validators.required])],
      ptoNotes: ['', Validators.nullValidator],

      salary: ['', Validators.compose([Validators.required])],
      plannedBonus: ['', Validators.compose([Validators.required])],
      ptoToSell: [0, Validators.compose([Validators.required])],

      buyOrSell: [null, Validators.compose([Validators.required])],
      hoursInBuyOrSell: [0, Validators.compose([Validators.required])],
    });
  }


  ngOnInit(): void {

    this.loadPtoValues();
  }


  loadBonusData() {
    this.resetForm();

    this.bonusData$ = this.userService.getBonusData(this.authService.getUserKey());

    this.bonusData$.pipe(take(1)).subscribe(result => {
      if (result == null) {
        this.alertService.showToaster('No Saved Data Found');
        return;
      }
      this.form.controls.ptoEstimatedWillUse.setValue(result.ptoEstimatedWillUse);
      this.form.controls.ptoNotes.setValue(result.ptoNotes);

      this.form.controls.salary.setValue(result.salary);
      this.form.controls.plannedBonus.setValue(result.plannedBonus);
      //this.form.controls.ptoToSell.setValue(0);

      this.form.controls.buyOrSell.setValue(result.buyOrSell);
      this.form.controls.hoursInBuyOrSell.setValue(result.hoursInBuyOrSell);
    });

    this.alertService.showToaster('Data Loaded');
  }

  saveBonusData() {
    let bonusData: BonusData = {
      ptoEstimatedWillUse: this.form.controls.ptoEstimatedWillUse.value,
      ptoNotes: this.form.controls.ptoNotes.value,

      salary: this.form.controls.salary.value,
      plannedBonus: this.form.controls.plannedBonus.value,

      buyOrSell: this.form.controls.buyOrSell.value,
      hoursInBuyOrSell: this.form.controls.hoursInBuyOrSell.value,

      endOfYearBonus: this.calculateBonus(),
      endOfYearPtoBalanceAfterSale: this.calculateEndOfYearPtoBalanceAfterSale(),
    }

    this.userService.setBonusData(this.authService.getUserKey(), bonusData);

    this.alertService.showToaster('Form Saved');
  }

  resetForm() {
    this.previousPtoEstimatedWillUse = this.form.controls.ptoEstimatedWillUse.value;
    this.previousPtoEstimatedWillEarn = this.form.controls.ptoEstimatedWillEarn.value;
    this.previousPtoBalance = this.form.controls.ptoBalance.value;

    this.loadPtoValues();
    this.clearUnsavedFields();
    this.form.markAsPristine();

    this.alertService.showToaster('Form reset');
  }

  clearUnsavedFields() {
    this.form.controls.ptoEstimatedWillUse.setValue('');
    this.form.controls.ptoNotes.setValue('');

    this.form.controls.salary.setValue('');
    this.form.controls.plannedBonus.setValue('');
    this.form.controls.ptoToSell.setValue(0);

    this.form.controls.buyOrSell.setValue(null);
    this.form.controls.hoursInBuyOrSell.setValue(0);
  }

  loadPtoValues() {
    // Get the official PTO count
    this.pto$ = this.userService.getOfficialPto(this.authService.getUserKey(this.authService.getUser()));

    this.pto$.pipe(take(1)).subscribe(result => {
      this.existingPtoBalance = result.balance;
      this.existingptoAsOf = result.asOf;

      this.form.controls.ptoBalance.setValue(this.existingPtoBalance);

      var date = new Date();
      var currentMonth = date.getMonth() + 1;
      var monthsRemaining = (12 - currentMonth) + 1;
      if (currentMonth == 1) {
        // set value to zero because this calculator is confusing in January. 
        // the user is probably checking this for the previous year's data.
        this.form.controls.ptoEstimatedWillEarn.setValue(0);
        this.form.controls.ptoEstimatedWillUse.setValue(0);
      } else {
        let roundedToHundredth = Math.round(monthsRemaining * 11.66 * 100) / 100;
        let roundedToQuarterHour = (Math.round(roundedToHundredth * 4) / 4).toFixed(2);

        this.form.controls.ptoEstimatedWillEarn.setValue(roundedToHundredth);
        this.form.controls.ptoEstimatedWillUse.setValue(roundedToQuarterHour);
      }

    });
  }

  endOfYearPtoBalance(): number {
    var balance = +this.form.controls.ptoBalance.value;
    var willEarn = +this.form.controls.ptoEstimatedWillEarn.value;
    var willUse = +this.form.controls.ptoEstimatedWillUse.value;
    return Math.round((balance + willEarn - willUse) * 100) / 100;
  }

  calculateRate(): number {
    if (!this.form.controls.salary.value) {
      return null;
    }

    var salary = +this.form.controls.salary.value;
    var plannedBonus = +this.form.controls.plannedBonus.value;
    return (salary + plannedBonus) / 1860;
  }

  formatLabel(value: number) {
    if (value >= 0) {
      return "Sell " + value + " hours"
    } else {
      return "Buy " + value + " hours"
    }
  }

  calculateEndOfYearPtoBalanceAfterSale() {
    if (this.form.controls.buyOrSell.value == 'sell') {
      const amount = this.endOfYearPtoBalance() - +this.form.controls.hoursInBuyOrSell.value;
      return Math.round(amount * 100) / 100;
    }
    if (this.form.controls.buyOrSell.value == 'buy') {
      const amount = this.endOfYearPtoBalance() + +this.form.controls.hoursInBuyOrSell.value;
      return Math.round(amount * 100) / 100;
    }
    return null;
  }

  calculateBonus() {
    if (this.form.controls.buyOrSell.value == 'sell') {
      const amount = +this.form.controls.plannedBonus.value + (this.calculateRate() * +this.form.controls.hoursInBuyOrSell.value);
      return Math.round(amount * 100) / 100;
    }
    if (this.form.controls.buyOrSell.value == 'buy') {
      const amount = +this.form.controls.plannedBonus.value - (this.calculateRate() * +this.form.controls.hoursInBuyOrSell.value);
      return Math.round(amount * 100) / 100;
    }
    return null;
  }


}
