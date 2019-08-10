import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

import { User, ChargeCode } from '../models';
import { AlertService } from './alert.service';
import { defaultAuthFirebaseUIConfig } from 'ngx-auth-firebaseui/module/interfaces/config.interface';
import { Observable, of } from 'rxjs';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { MonthlyTimecard } from '@shared/models/monthly-timecard.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { promise } from 'protractor';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

  constructor(
    private alertService: AlertService,
    private db: AngularFireDatabase,
    private authService: AuthService
    ) {}


  //set = REPLACE
  //update = modify 


  /**
   * Timecards
   */
  public saveTimecard(userKey: string, year: string, month: string, monthlyTimecard: MonthlyTimecard) {
    const sendAlert = this.alertService;
    return firebase.database().ref().child('employeeEditableFields/').child('timecards').child(year).child(month).child(userKey).set(monthlyTimecard, 
      function(error) {
        if (error) {
          sendAlert.showToaster("Failure");
          console.log("Failure");
        } else {
          sendAlert.showToaster("Success");
          console.log("Success");
        }
      });

     
  }


  public getTimecard(userKey: string, year: string, month: string) : Observable<any> {
    return this.db.object(`employeeEditableFields/timecards/${year}/${month}/${userKey}`).valueChanges();
  }


  /**
   * Charge Codes
   */
  public createChargeCode(chargeCode: ChargeCode) {
    const promise = this.db.list<ChargeCode>('chargeCodes').set(chargeCode.name, chargeCode);
    promise
      .then(_=> console.log('success'))
      .catch(err => console.log(err, 'problem'));
  }

  public getChargeCodes() : Observable<ChargeCode[]> {
    return this.db.list<ChargeCode>('chargeCodes').valueChanges();
  }

  public deleteChargeCode(chargeCodeName: string) {
    const promise = this.db.list<ChargeCode>('chargeCodes').remove(chargeCodeName);
    promise
      .then(_=> console.log('success'))
      .catch(err => console.log(err, 'problem'));
  }

   /**
   * Users
   */
  public createUser(user: User) {
    var userKey = this.authService.getUserKey(user);
    const promise = this.db.list<User>('users').set(userKey, user);
    promise
      .then(_=> console.log('success'))
      .catch(err => console.log(err, 'problem'));

  }

  public getUsers() : Observable<User[]> {
    return this.db.list<User>('users').valueChanges();
  }

  public getUserChargeCodes(userKey: string) : Observable<string[]> {
    return this.db.list<string>(`users/${userKey}/chargeCodeNames`).valueChanges();
  }

  public deleteUser(user: User) {
    var userKey = this.authService.getUserKey(user);

    const promise = this.db.list<User>('users').remove(userKey);
    promise
      .then(_=> console.log('success'))
      .catch(err => console.log(err, 'problem'));

  }

  public updateUser(user: User) {
    var userKey = this.authService.getUserKey(user);
    const promise = this.db.list<User>('users').set(userKey, user);
    promise
      .then(_=> console.log('success'))
      .catch(err => console.log(err, 'problem'));
  }


  public getCurrentTimePeriod(userKey: string): Observable<any> {
    return this.db.object(`employeeEditableFields/${userKey}/preferences/currentTimePeriod`).valueChanges();
  }

  public setCurrentTimePeriod(userKey: string, currentTimePeriod: CurrentTimePeriod) {
    return this.db.object(`employeeEditableFields/${userKey}/preferences`).set({currentTimePeriod});
  }


  public verificationUserEmail(): Promise<void> {
    return firebase.auth().currentUser.sendEmailVerification().then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }


}
