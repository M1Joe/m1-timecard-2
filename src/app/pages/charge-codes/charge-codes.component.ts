import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup  } from '@angular/forms';

import { UserService, EmailValidator, ChargeCode } from '@shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-charge-codes',
  templateUrl: './charge-codes.component.html',
  styleUrls: ['./charge-codes.component.scss']
})
export class ChargeCodesComponent implements OnInit {
  

  //public form: FormGroup;
  chargeCodes$ : Observable<ChargeCode[]>;
  
  constructor( private userService: UserService) {

  }

  ngOnInit(): void {
    this.chargeCodes$ = this.userService.getChargeCodes();
  }

  deleteChargeCode(chargeCodeName: string) {
    this.userService.deleteChargeCode(chargeCodeName);
  }

  public refreshChargeCodeList() {
  }
}
