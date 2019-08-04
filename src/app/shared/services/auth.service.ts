import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  public token: string;

  constructor(
    private router: Router,
    private auth: AngularFireAuth) { }

  public onSuccess(): void {
    sessionStorage.setItem('session-alive', 'true');
    this.token = 'some-temporary-token';
    this.router.navigate(['/timecard']);
    console.log('AUTH: ', this.auth);
  }

  public logout(): void {
    sessionStorage.removeItem('session-alive');
    this.token = null;
    console.log('LOGOUT!');
    this.router.navigate(['/login']);
  }

  public getIdToken(): string {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  public isAuthenticated(): string {
    return sessionStorage.getItem('session-alive');
  }

  public getDisplayName(): string {
    console.log(firebase.auth().currentUser.email);
    //everything before the @ symbol
    var displayName = firebase.auth().currentUser.email.substr(0, firebase.auth().currentUser.email.indexOf('@')); 
  
    //remove periods because they mess with firebase
    displayName = displayName.replace('.','');

    return displayName;
  }
}
