import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { User, ChargeCode } from '../models';
import { AlertService } from './alert.service';
import { Observable, of } from 'rxjs';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { MonthlyTimecard } from '@shared/models/monthly-timecard.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { ExpenseReport } from '@shared/models/expense-report.model';
import { PTO } from '@shared/models/pto.model';
import { ExpenseReportFilter } from '@shared/models/expense-report-filter.model';
import { BonusData } from '@shared/models/bonus-data.model';

@Injectable()
export class UserService {

  constructor(
    private alertService: AlertService,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) { }


  //set = REPLACE
  //update = modify 

  filterEmptyFields(data: any): any {    // Filter any fields that aren't empty & store in a new object - To be passed on the Pipe map's caller
    let fields = {};
    Object.keys(data).forEach(key => data[key] != "" ? fields[key] = data[key] : key);
    return fields;
  }
  /**
   * Timecards
   */
  public saveTimecard(userKey: string, year: string, month: string, monthlyTimecard: MonthlyTimecard) {

    for (let i in monthlyTimecard.activities) {
      monthlyTimecard.activities[i] = this.filterEmptyFields(monthlyTimecard.activities[i]);
    }

    var successMessage = 'Timecard saved';
    if (monthlyTimecard.status === 'SUBMITTED') {
      successMessage = 'Timecard submitted';
    }

    const sendAlert = this.alertService;
    return firebase.database().ref().child('employeeEditableFields/').child('timecards').child(year).child(month).child(userKey).set(monthlyTimecard,
      function (error) {
        if (error) {
          sendAlert.showToaster("Failed to save timecard", userKey);
          console.log("Failure");
        } else {
          sendAlert.showToaster(successMessage, userKey);
          console.log("Success");
        }
      });


  }


  public getTimecard(userKey: string, year: string, month: string): Observable<any> {
    return this.db.object(`employeeEditableFields/timecards/${year}/${month}/${userKey}`).valueChanges();
  }


  /**
   * Charge Codes
   */
  public createChargeCode(chargeCode: ChargeCode) {
    const promise = this.db.list<ChargeCode>('chargeCodes').set(chargeCode.name, chargeCode);
    promise
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'problem'));
  }

  public getChargeCodes(): Observable<ChargeCode[]> {
    return this.db.list<ChargeCode>('chargeCodes').valueChanges();
  }

  public deleteChargeCode(chargeCodeName: string) {
    const promise = this.db.list<ChargeCode>('chargeCodes').remove(chargeCodeName);
    promise
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'problem'));
  }


  /**
   * PTO
   */
  public getOfficialPto(userKey: string): Observable<any> {
    return this.db.object(`users/${userKey}/pto`).valueChanges();
  }

  public getPtoForMonth(userKey: string, year: string, month: string): Observable<any> {
    console.log(month);
    return this.db.object(`employeeEditableFields/timecards/${year}/${month}/${userKey}/pto`).valueChanges();
  }

  public savePto(userKey: string, pto: PTO) {
    return this.db.object(`users/${userKey}/pto`).set(pto);
  }


  /**
   * Timecards
   */

  public createExpenseReport(expenseReport: ExpenseReport) {
    expenseReport.id = this.db.createPushId();
    const promise = this.db.list<ExpenseReport>('expenseReports').set(expenseReport.id, expenseReport);
    promise
      .then(_ => this.alertService.showToaster("Expense Created"))
      .catch(err => this.alertService.showToaster("ERROR: Could not create expense"));
  }

  public saveExpenseReport(expenseReport: ExpenseReport) {
    const promise = this.db.list<ExpenseReport>('expenseReports').set(expenseReport.id, expenseReport);
    promise
      .then(_ => this.alertService.showToaster("Expense Saved"))
      .catch(err => console.log(err, 'problem'));
  }

  public getExpenseReports(filter: ExpenseReportFilter): Observable<ExpenseReport[]> {
    if (filter.user.email === "ALL") {
      if (filter.status === 'ALL') {
        return this.db.list<ExpenseReport>('expenseReports', ref => ref.orderByChild('keyYearMonth').equalTo(filter.selectedYear + '-' + filter.selectedMonth)).valueChanges();
      } else {
        return this.db.list<ExpenseReport>('expenseReports', ref => ref.orderByChild('keyYearMonthStatus').equalTo(filter.selectedYear + '-' + filter.selectedMonth + '-' + filter.status)).valueChanges();
      }
    } else {
      if (filter.status === 'ALL') {
        return this.db.list<ExpenseReport>('expenseReports', ref => ref.orderByChild('keyYearMonthUser').equalTo(filter.selectedYear + '-' + filter.selectedMonth + '-' + this.authService.getUserKey(filter.user))).valueChanges();
      } else {
        return this.db.list<ExpenseReport>('expenseReports', ref => ref.orderByChild('keyYearMonthUserStatus').equalTo(filter.selectedYear + '-' + filter.selectedMonth + '-' + this.authService.getUserKey(filter.user) + '-' + filter.status)).valueChanges();
      }
    }

  }

  public deleteExpenseReport(expenseReport: ExpenseReport) {
    var id = expenseReport.id;

    const promise = this.db.list<ExpenseReport>('expenseReports').remove(id);
    promise
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'problem'));
  }




  /**
  * Users
  */
  public createUser(user: User) {
    var userKey = this.authService.getUserKey(user);
    const promise = this.db.list<User>('users').set(userKey, user);
    promise
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'problem'));

  }

  public getUsers(): Observable<User[]> {
    return this.db.list<User>('users').valueChanges();
  }

  public getUserChargeCodes(userKey: string): Observable<string[]> {
    return this.db.list<string>(`users/${userKey}/chargeCodeNames`).valueChanges();
  }

  public deleteUser(user: User) {
    var userKey = this.authService.getUserKey(user);

    const promise = this.db.list<User>('users').remove(userKey);
    promise
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'problem'));
  }

  public updateUser(user: User) {
    var userKey = this.authService.getUserKey(user);
    const promise = this.db.list<User>('users').set(userKey, user);
    promise
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'problem'));
  }

  public getPercentEmployed(userKey: string): Observable<any> {
    return this.db.object(`employeeEditableFields/${userKey}/percentEmployed`).valueChanges();
  }

  public setPercentEmployed(userKey: string, percentEmployed: number) {
    return this.db.object(`employeeEditableFields/${userKey}/percentEmployed`).set({ percentEmployed });
  }

  public getCurrentTimePeriod(userKey: string): Observable<any> {
    return this.db.object(`employeeEditableFields/${userKey}/preferences/currentTimePeriod`).valueChanges();
  }

  public setCurrentTimePeriod(userKey: string, currentTimePeriod: CurrentTimePeriod) {
    return this.db.object(`employeeEditableFields/${userKey}/preferences`).set({ currentTimePeriod });
  }

  public getBonusData(userKey: string): Observable<any> {
    return this.db.object(`employeeEditableFields/${userKey}/bonus/bonusData`).valueChanges();
  }

  public setBonusData(userKey: string, bonusData: BonusData) {
    return this.db.object(`employeeEditableFields/${userKey}/bonus`).set({ bonusData });
  }

  public verificationUserEmail(): Promise<void> {
    return firebase.auth().currentUser.sendEmailVerification().then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }


}
