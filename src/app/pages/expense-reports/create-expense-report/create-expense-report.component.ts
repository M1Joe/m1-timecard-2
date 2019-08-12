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

  public onSubmit(form: NgForm) {

    var expenseReport: ExpenseReport = this.expenseForm.value;
    expenseReport.status = 'SUBMITTED';
    expenseReport.email = this.authService.getUserKey();
    expenseReport.fromYear = 'TODO';
    expenseReport.fromMonth = 'TODO';
    expenseReport.dateSubmitted = "" + Date.now();
    
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
