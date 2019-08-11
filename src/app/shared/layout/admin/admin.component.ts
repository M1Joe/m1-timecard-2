import { Component } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService, AlertService } from '../../services';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  public isAuthenticated: string;
  //public emailPrefix: string;
  public test: string;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    ) {
      this.isAuthenticated = this.authService.isAuthenticated()
      //this.emailPrefix = this.authService.getEmailPrefix();
  }

  public userUid(): string {
    return firebase.auth().currentUser.uid;
  }

  public userEmail(): string {
    return firebase.auth().currentUser.email;
  }

  public userName(): string {
    console.log('1');
    //console.log(firebase.auth().currentUser.displayName);
    //console.log(firebase.auth().currentUser.email);
    return firebase.auth().currentUser.displayName;
  }

  public onLogout(): void {
    this.alertService.showToaster('Logout succesful');
    return this.authService.logout();
  }

  public isAdmin() {
    return this.authService.isAdmin();
  }

  
}
