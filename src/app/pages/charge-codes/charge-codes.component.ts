import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '@shared';
import {AuthProvider, Theme} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-charge-codes',
  templateUrl: './charge-codes.component.html',
  styleUrls: ['./charge-codes.component.scss']
})
export class ChargeCodesComponent {

  constructor(private authService: AuthService) {}


}
