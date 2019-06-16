import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '@shared';
import {AuthProvider, Theme} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(private authService: AuthService) {}


}
