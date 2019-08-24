import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string;

  adminMode = false;

  constructor(
    private router: Router,
    private af: AngularFireAuth,
    private afAuth: AngularFireAuth) { }

  public onSuccess(): void {
    sessionStorage.setItem('session-alive', 'true');
    this.token = 'some-temporary-token';
    this.router.navigate(['/timecard']);
  }

  public logout(): void {
    sessionStorage.removeItem('session-alive');
    this.token = null;
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

  public setAdminMode(mode: boolean) {
    this.adminMode = mode;
  }

  public isAdminMode(): boolean {
    return this.isAdmin() && this.adminMode;
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //   return this.afAuth.au
  //   return this.af.auth.subscribe((auth) =>  {
  //     if(auth == null) {
  //       this.router.navigate(['/login']);
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }).first()
  // }
}
