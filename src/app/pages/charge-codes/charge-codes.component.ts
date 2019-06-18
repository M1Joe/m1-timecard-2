import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup  } from '@angular/forms';

import { UserService, EmailValidator, ChargeCode } from '@shared';

@Component({
  selector: 'app-charge-codes',
  templateUrl: './charge-codes.component.html',
  styleUrls: ['./charge-codes.component.scss']
})
export class ChargeCodesComponent implements OnInit {
  

  //public form: FormGroup;
  chargeCodes : ChargeCode[];
  
  constructor( private userService: UserService) {
    //private userService: UserService
    // public formBuilder: FormBuilder) {
    // this.form = formBuilder.group({
    //   email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    // });
  }

  ngOnInit(): void {
    this.chargeCodes = this.userService.getChargeCodes();
  }

  deleteChargeCode(chargeCodeName: string) {
    this.userService.deleteChargeCode(chargeCodeName);
    this.refreshChargeCodeList();
  }

  // public onSubmit(form: NgForm) {
  //   const email = form.value.email;
  //   return this.userService.keepInTouch(email);
  // }

  public refreshChargeCodeList() {
    this.chargeCodes = this.userService.getChargeCodes();
  }
}
