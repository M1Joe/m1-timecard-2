import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { User } from '@shared/models/user.model';
import { Observable, pipe } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/internal/operators/map';


@Injectable()
export class AuthService {
  public token: string;

  constructor(
    private router: Router,
    private af: AngularFireAuth,
    private afAuth: AngularFireAuth) { }

  public onSuccess(): void {
    sessionStorage.setItem('session-alive', 'true');
    this.token = 'some-temporary-token';
    this.router.navigate(['/timecard']);
    console.log('afAuth: ', this.afAuth);
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

  public getUserKey(user?: User): string {
    
    var userKey;

    //everything before the @ symbol
    if (user) {
      userKey = user.email.substr(0, user.email.indexOf('@')); 
    } else {
      userKey = firebase.auth().currentUser.email.substr(0, firebase.auth().currentUser.email.indexOf('@')); 
    }
    
    //remove periods because they mess with firebase
    userKey = userKey.replace('.','');

    return userKey;
  }

  public getUserKeyNew(user?: User): Observable<string> {
    return this.af.authState.pipe(map((auth) => {
      if (auth == null) {
        this.router.navigate(['/login']);
        return '';
      } else {
        var userKey = this.afAuth.auth.currentUser.email;
        userKey = userKey.substr(0, userKey.indexOf('@'));
        userKey = userKey.replace('.','');
        return userKey;
      }
    }));
  }

  public isAdmin(): boolean {
    return this.getUserKey() === 'joe';
  }

  public getUser(): User {
    return firebase.auth().currentUser;
  }
}
