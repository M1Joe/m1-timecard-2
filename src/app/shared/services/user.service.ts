import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

import { User, ChargeCode } from '../models';
import { AlertService } from './alert.service';
import { defaultAuthFirebaseUIConfig } from 'ngx-auth-firebaseui/module/interfaces/config.interface';

@Injectable()
export class UserService {

  constructor(private alertService: AlertService) {}

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
