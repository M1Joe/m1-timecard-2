// Modules 3rd party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatProgressBarModule,
         MatCardModule, MatIconModule, MatDatepickerModule, MatCheckboxModule, MatTableModule } from '@angular/material';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

// Components
import { ExpenseReportsComponent } from './expense-reports.component';
import { CreateExpenseReportComponent } from './create-expense-report/create-expense-report.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ExpenseReportsComponent,
    CreateExpenseReportComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, MatInputModule, MatProgressBarModule, MatTableModule,
    MatCardModule, MatIconModule, MatDatepickerModule, MatCheckboxModule,
    NgxAuthFirebaseUIModule,
    FlexLayoutModule
  ],
  providers: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    ExpenseReportsComponent,
    CreateExpenseReportComponent
  ]
})
export class ExpenseReportModule {
}
