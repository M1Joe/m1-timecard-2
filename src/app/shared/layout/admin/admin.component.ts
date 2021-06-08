import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

import { AuthService, AlertService } from '../../services';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {

  public test: string;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
  ) {

  }

  public userUid(): string {
    return firebase.auth().currentUser.uid;
  }

  public userEmail(): string {
    return firebase.auth().currentUser.email;
  }

  public userName(): string {
    return firebase.auth().currentUser.displayName;
  }

  public onLogout(): void {
    this.alertService.showToaster('Logout successful');
    return this.authService.logout();
  }

  public isAdminMode(): boolean {
    return this.authService.isAdminMode();
  }

}
