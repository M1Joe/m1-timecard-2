import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup  } from '@angular/forms';

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
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    public formBuilder: FormBuilder) {
    this.expenseForm = formBuilder.group({
      fromDate: ['', Validators.compose([Validators.required])],
      toDate: [''],

      amount: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      
      reimburseable: [false],
      contract: [''],
      
    });
  }

  generateStringFromDate(date: Date) {
    var month = date.getMonth() + 1; //months from 1-12
    var day = date.getDate();
    var year = date.getFullYear();
    return month + '/' + day + '/' + year;
  }

  public onSubmit(form: NgForm) {

    var expenseReport: ExpenseReport = this.expenseForm.value;

    if (expenseReport.reimburseable === undefined) {
      expenseReport.reimburseable = false;
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
    this.resetFormAfterSubmission();
    
  }

  public resetFormAfterSubmission() {
    
    //TODO: FIX THIS so that the amount and description fields don't show errors after completed.
    


    // this.expenseForm.controls.amount.setValue('')
    // this.expenseForm.controls.description.setValue('')
    // this.expenseForm.markAsPristine();
    // this.expenseForm.markAsUntouched();

    // this.expenseForm.controls.amount.reset();
    // this.expenseForm.controls.amount.markAsPristine();
    // this.expenseForm.controls.amount.markAsUntouched();
    // this.expenseForm.controls.description.reset();
    // this.expenseForm.controls.description.markAsPristine();
    // this.expenseForm.controls.description.markAsUntouched();
  }

}
