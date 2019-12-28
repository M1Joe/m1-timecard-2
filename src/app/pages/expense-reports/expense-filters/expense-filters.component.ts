import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { ExpenseReportFilter } from '@shared/models/expense-report-filter.model';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';
import { UserService } from '@shared/services/user.service';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-expense-filters',
  templateUrl: './expense-filters.component.html',
  styleUrls: ['./expense-filters.component.scss']
})
export class ExpenseFiltersComponent implements OnInit {

  //@Input() currentTimePeriod: CurrentTimePeriod;
  @Input() expenseReportFilter: ExpenseReportFilter;

  @Output() filterExpenseRequest: EventEmitter<object> = new EventEmitter();
  
  users$: Observable<User[]>;
  currentlyViewedUser: User;
  
  all: User = {displayName: 'ALL', uid: 'ALL', email: 'ALL'}


  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();

    this.currentlyViewedUser = this.expenseReportFilter.user;
  }

  filter() {
    this.filterExpenseRequest.emit({
      selectedMonth: this.expenseReportFilter.selectedMonth, 
      selectedYear: this.expenseReportFilter.selectedYear, 
      user: this.currentlyViewedUser,
      status: this.expenseReportFilter.status
    });
  }

  isAdminMode() {
    return this.authService.isAdminMode();
  }

  isReviewerMode() {
    return this.authService.isReviewerMode();
  }

  compareObjects(user1: User, user2: User): boolean {
    return user1.email === user2.email;
  }

  setCurrentUser(event) {
    this.currentlyViewedUser = event.value;
  }
}
