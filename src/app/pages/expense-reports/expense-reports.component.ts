import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup  } from '@angular/forms';

import { UserService, EmailValidator, ChargeCode, AuthService, User } from '@shared';
import { Observable } from 'rxjs';
import { ExpenseReport } from '@shared/models/expense-report.model';
import { MatPaginator, PageEvent } from '@angular/material';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { ExpenseReportFilter } from '@shared/models/expense-report-filter.model';

@Component({
  selector: 'app-expense-reports',
  templateUrl: './expense-reports.component.html',
  styleUrls: ['./expense-reports.component.scss']
})
export class ExpenseReportsComponent implements OnInit {  // , AfterViewInit {
  
  expenseReports$ : Observable<ExpenseReport[]>;
  displayedColumns = ["userKey", "type","dateSubmitted", "fromDate", "toDate", "fromLocation","toLocation","roundTrip","mileage","mileageRate","tolls","amount", "description", "contract", "status", "actions"];
  
  expenseReportFilter: ExpenseReportFilter;

  constructor( private userService: UserService, private authService: AuthService) {

  }

  ngOnInit(): void {
    //set filters to current month
    var all: User = {displayName: 'ALL', uid: 'ALL', email: 'ALL'}

    this.expenseReportFilter =  {
      user: all, 
      selectedYear: (new Date()).getFullYear().toString(), 
      selectedMonth: ((new Date()).getMonth() + 1).toString(),
      status: "ALL"
    };

    this.getExpenseReport();

  }

  getExpenseReport() {
    this.expenseReports$ = this.userService.getExpenseReports(this.expenseReportFilter); //this.startAt, this.pageSize);
  }

  deleteExpenseReport(expenseReport: ExpenseReport) {
    this.userService.deleteExpenseReport(expenseReport);
  }

  markExpenseReportAsPaid(expenseReport: ExpenseReport) {
    expenseReport.status = 'PAID';
    expenseReport.keyYearMonthUserStatus = expenseReport.keyYearMonthUserStatus.replace('SUBMITTED', 'PAID');
    expenseReport.keyYearMonthStatus = expenseReport.keyYearMonthStatus.replace('SUBMITTED', 'PAID');
    this.userService.saveExpenseReport(expenseReport);
  }

  executeFilterRequest(filter: ExpenseReportFilter) {
    this.expenseReports$ = this.userService.getExpenseReports(filter)
    
  }

}
