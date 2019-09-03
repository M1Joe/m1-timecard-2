import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';

import { UserService, EmailValidator, ChargeCode, AuthService } from '@shared';
import { ExpenseReport } from '@shared/models/expense-report.model';

@Component({
  selector: 'app-create-expense-report',
  templateUrl: './create-expense-report.component.html',
  styleUrls: ['./create-expense-report.component.scss']
})
export class CreateExpenseReportComponent {

  public expenseForm: FormGroup;
  reimburseableChecked: boolean;
  public currentType: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public formBuilder: FormBuilder) {
    this.expenseForm = formBuilder.group({
      fromDate: ['', Validators.compose([Validators.nullValidator])],
      toDate: ['', Validators.compose([Validators.nullValidator])],

      amount: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],

      reimburseable: [false],
      contract: [''],

      type: ['', Validators.compose([Validators.required])],

      fromLocation: [''],
      toLocation: [''],
      roundTrip: [false],
      mileage: [''],
      mileageRate: [''],
      tolls: [''],

      //TODO: Add options for TDY, local travel, training, tech reimbursements, and other to expense report.

    });
  }

  generateStringFromDate(date: Date) {
    var month = date.getMonth() + 1; //months from 1-12
    var day = date.getDate();
    var year = date.getFullYear();
    return month + '/' + day + '/' + year;
  }

  public onSubmit(form: FormGroupDirective) {

    this.currentType = '';

    var expenseReport: ExpenseReport = this.expenseForm.value;

    if (expenseReport.reimburseable === undefined) {
      expenseReport.reimburseable = false;
    }

    if (expenseReport.roundTrip === undefined) {
      expenseReport.roundTrip = false;
    }


    expenseReport.status = 'SUBMITTED';
    expenseReport.userKey = this.authService.getUserKey();


    expenseReport.fromDate = this.generateStringFromDate(this.expenseForm.value.fromDate);
    if (expenseReport.toDate) {
      expenseReport.toDate = this.generateStringFromDate(this.expenseForm.value.toDate);
    }
    expenseReport.dateSubmitted = this.generateStringFromDate(new Date());

    const fromYear = new Date(this.expenseForm.value.fromDate).getFullYear();
    const fromMonth = new Date(this.expenseForm.value.fromDate).getMonth() + 1;
    expenseReport.keyYearMonth = fromYear + '-' + fromMonth;
    expenseReport.keyYearMonthUser = fromYear + '-' + fromMonth + '-' + this.authService.getUserKey();
    expenseReport.keyYearMonthStatus = fromYear + '-' + fromMonth + '-' + expenseReport.status;
    expenseReport.keyYearMonthUserStatus = fromYear + '-' + fromMonth + '-' + this.authService.getUserKey() + '-' + expenseReport.status;

    this.userService.createExpenseReport(expenseReport);

    //TODO: Only reset form is save was actually successful.
    this.resetFormAfterSubmission(form);

  }

  public resetFormAfterSubmission(form: FormGroupDirective) {

    
    var tempForm = this.expenseForm.value;
    tempForm.amount = '';
    tempForm.description = '';
    form.resetForm();

    this.expenseForm.patchValue({contract: tempForm.contract, reimburseable: tempForm.reimburseable, fromDate: tempForm.fromDate}); 
    

    // fromLocation: [''],
    //   toLocation: [''],
    //   roundTrip: [false],
    //   mileage: [''],
    //   mileageRate: [''],
    //   tolls: [''],
  }

  clearContract() {
    //clear contract when reimburseable button is clicked
    this.expenseForm.patchValue({contract: ''});
  }

  setType(event) {
    this.currentType = event.value;
  }
}
