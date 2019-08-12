import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup  } from '@angular/forms';

import { UserService, EmailValidator, ChargeCode } from '@shared';
import { Observable } from 'rxjs';
import { ExpenseReport } from '@shared/models/expense-report.model';

@Component({
  selector: 'app-expense-reports',
  templateUrl: './expense-reports.component.html',
  styleUrls: ['./expense-reports.component.scss']
})
export class ExpenseReportsComponent implements OnInit {
  

  //public form: FormGroup;
  expenseReports$ : Observable<ExpenseReport[]>;
  displayedColumns = ["email", "dateSubmitted", "fromDate", "toDate", "amount", "description", "contract", "status", "actions"];
  
  constructor( private userService: UserService) {

  }

  ngOnInit(): void {
    this.expenseReports$ = this.userService.getExpenseReports();
  }

  deleteExpenseReport(expenseReport: ExpenseReport) {
    this.userService.deleteExpenseReport(expenseReport);
  }

  markExpenseReportAsPaid(expenseReport: ExpenseReport) {
    expenseReport.status = 'PAID';
    this.userService.saveExpenseReport(expenseReport);
  }

}
