import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

import { User, ChargeCode } from '../models';
import { AlertService } from './alert.service';
import { defaultAuthFirebaseUIConfig } from 'ngx-auth-firebaseui/module/interfaces/config.interface';
import { Observable, of } from 'rxjs';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { MonthlyTimecard } from '@shared/models/monthly-timecard.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()
export class UserService {

  constructor(
    private alertService: AlertService,
    private db: AngularFireDatabase
    ) {}

  public saveUserInfo(uid: string, name: string, email: string): Promise<string> {
    return firebase.database().ref().child('users/' + uid).set({
      name: name,
      email: email
    });
  }

  public updateUserInfo(uid: string, displayName: string, bio: string): Promise<string> {
    return firebase.database().ref().child('users/' + uid).update({
      displayName: displayName,
      bio: bio
    });
  }

  public keepInTouch(email: string) {
    //this.alertService.showToaster('Your email is saved');
    return firebase.database().ref().child('chargeCodes/').push({
      email: email
    });
  }


  //set = REPLACE
  //update = modify 


  /**
   * Timecards
   */
  public saveTimecard(userDisplayName: string, year: string, month: string, monthlyTimecard: MonthlyTimecard) {
    const sendAlert = this.alertService;
    return firebase.database().ref().child('employeeEditableFields/').child('timecards').child(year).child(month).child(userDisplayName).set(monthlyTimecard, 
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


  public getTimecard(userDisplayName: string, year: string, month: string) : Observable<any> {
    return this.db.object(`employeeEditableFields/timecards/${year}/${month}/${userDisplayName}`).valueChanges();
  }


  /**
   * Charge Codes
   */
  public createChargeCode(chargeCode: ChargeCode) {
    const sendAlert = this.alertService;
    return firebase.database().ref().child('chargeCodes/').child(chargeCode.name).set(chargeCode, 
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

  public getChargeCodes() : ChargeCode[] {

    const chargeCodes: ChargeCode[] = [];

    var ref = firebase.database().ref().child('chargeCodes');
    ref.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        chargeCodes.push(childSnapshot.val())
      });
    });

    return chargeCodes;
  }

  public deleteChargeCode(chargeCodeName: string) {
    const sendAlert = this.alertService;
    return firebase.database().ref().child('chargeCodes/').child(chargeCodeName).remove(function(error) {
      if (error) { 
        sendAlert.showToaster('Delete Failed');
      } else {
        sendAlert.showToaster('Delete Successful');
      }
    });
  }

   /**
   * Users
   */
  public createUser(user: User) {
    const sendAlert = this.alertService;
    return firebase.database().ref().child('users/').child(user.displayName).set(user, 
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

  public getUsers() : User[] {

    const users: User[] = [];

    var ref = firebase.database().ref().child('users');
    ref.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        users.push(childSnapshot.val())
      });
    });

    return users;
  }

  public getUserChargeCodes(userDisplayName: string) : string[] {

    const chargeCodes: string[] = [];

    var ref = firebase.database().ref().child('users').child(userDisplayName).child('chargeCodeNames');
    ref.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        chargeCodes.push(childSnapshot.val())
      });
    });

    return chargeCodes;
  }

  public deleteUser(displayName: string) {
    const sendAlert = this.alertService;
    return firebase.database().ref().child('users/').child(displayName).remove(function(error) {
      if (error) { 
        sendAlert.showToaster('Delete Failed');
      } else {
        sendAlert.showToaster('Delete Successful');
      }
    });      
  }

  public updateUser(user: User): Promise<string>{
    const sendAlert = this.alertService;
    return firebase.database().ref().child('users/').child(user.displayName).update(user, 
      function(error) {
        if (error) {
          sendAlert.showToaster("Save Failure");
        } else {
          sendAlert.showToaster("Save Success");
        }
      });
  }

  /**
   * User Preferences
   */
  public getUserPreference(userDisplayName: string, preferenceName: string): CurrentTimePeriod[] {

    console.log(userDisplayName);
    var ref = firebase.database().ref().child('employeeEditableFields').child(userDisplayName).child('preferences').child(preferenceName);
        
    //var results: CurrentTimePeriod[] = [];
    var results: CurrentTimePeriod[] = [];

    ref.once("value").then(function(snapshot) {
      if(snapshot.val() == null) {
        var currentDate = new Date();
        var noPref: CurrentTimePeriod = {selectedMonth: (currentDate.getMonth() + 1).toString(), selectedYear: currentDate.getFullYear().toString()};
        results.push(noPref);
      } else {
        results.push(snapshot.val())
      }
      
    });

    console.log(results);
    
    return results;
  }


 

  // public getUserPreference(userDisplayName: string, preferenceName: string): Observable<any> {

  //   console.log(userDisplayName);
  //   var ref = firebase.database().ref().child('employeeEditableFields').child('users').child(userDisplayName).child('preferences').child(preferenceName);
        
  //   var results;

  //   ref.on('value', function(snapshot) {
  //     return snapshot.val();
  //     //console.log(snapshot.val())
      
  //     results = snapshot.val();
      
  //     console.log(results);
  //     console.log(results['selectedMonth']);
  //     return of(results);
  //   });

  //   return Observable.bindCallback(ref) as Observable<any>

  // }


  public updateUserPreference(userDisplayName: string, preferenceName: string, preferenceValue: any): Promise<string>{
    const sendAlert = this.alertService;
    return firebase.database().ref().child('employeeEditableFields').child(userDisplayName).child('preferences').child(preferenceName).update(preferenceValue, 
      function(error) {
        if (error) {
          sendAlert.showToaster("Save Failure");
        } else {
          //sendAlert.showToaster("Save Success");
        }
      });
  }


  public contactFormSend(
    company: string,
    firstname: string,
    lastname: string,
    address: string,
    city: string,
    postal: string,
    message: string
  ) {
    this.alertService.showToaster('This contact form is saved');
    return firebase.database().ref().child('contactform/').push({
      company: company,
      firstname: firstname,
      lastname: lastname,
      address: address,
      city: city,
      postal: postal,
      message: message
    });
  }

  public getUserProfileInformation(): void {
    const user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }
  }

  public verificationUserEmail(): Promise<void> {
    return firebase.auth().currentUser.sendEmailVerification().then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }

  public sendUserPasswordResetEmail(): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email).then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }

}
