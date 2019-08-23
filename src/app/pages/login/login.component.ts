import { Component, ViewEncapsulation } from '@angular/core';

import { AuthService } from '@shared';
import {AuthProvider, Theme} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  providers = AuthProvider;
  themes = Theme;

  public onSuccess(): void {
    return this.authService.onSuccess();
  }

}
