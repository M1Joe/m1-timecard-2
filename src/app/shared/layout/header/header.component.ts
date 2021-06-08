import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

import { AuthService, AlertService } from '../../services';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isAuthenticated: string;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    ) {
      this.isAuthenticated = this.authService.isAuthenticated()
  }


  public userName(): string {
    if (firebase.auth().currentUser) {
      return firebase.auth().currentUser.displayName;
    } else {
      return '';
    }
    
  }

  public onLogout(): void {
    this.alertService.showToaster('Logout successful');
    return this.authService.logout();
  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  public adminToggleChange(ob: MatSlideToggleChange) {
    this.authService.setAdminMode(ob.checked);
  }

  public isReviewer(): boolean {
    return this.authService.isReviewer();
  }

  public reviewerToggleChange(ob: MatSlideToggleChange) {
    this.authService.setReviewerMode(ob.checked);
  }
}
