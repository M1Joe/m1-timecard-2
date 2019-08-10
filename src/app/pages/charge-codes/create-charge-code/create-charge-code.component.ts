import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup  } from '@angular/forms';

import { UserService, EmailValidator, ChargeCode } from '@shared';

@Component({
  selector: 'app-create-charge-code',
  templateUrl: './create-charge-code.component.html',
  styleUrls: ['./create-charge-code.component.scss']
})
export class CreateChargeCodeComponent {

  public form: FormGroup;

  constructor(
    private userService: UserService,
    public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],

      startYear: ['', Validators.compose([Validators.required])],
      startMonth: ['', Validators.compose([Validators.required])],
      startDay: ['', Validators.compose([Validators.required])],
      
      endYear: ['', Validators.compose([Validators.required])],
      endMonth: ['', Validators.compose([Validators.required])],
      endDay: ['', Validators.compose([Validators.required])]
      
    });
  }

  public onSubmit(form: NgForm) {
    
    const chargeCode : ChargeCode = new ChargeCode;    
    chargeCode.name = form.value.name;
    chargeCode.type = form.value.type;

    chargeCode.startYear = form.value.startYear;
    chargeCode.startMonth = form.value.startMonth;
    chargeCode.startDay = form.value.startDay;
    
    chargeCode.endYear = form.value.endYear;
    chargeCode.endMonth = form.value.endMonth;
    chargeCode.endDay = form.value.endDay;

    this.userService.createChargeCode(chargeCode);

    return true;
    
  }

}
