import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder,  FormGroup, FormControl, FormArray  } from '@angular/forms';

import { UserService, User, ChargeCode } from '@shared';


//working example: https://stackblitz.com/edit/angular-5jj9om?file=app%2Fapp.component.ts

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  @Input() availableChargeCodes: ChargeCode[];
  availableChargeCodeNames: string[];
  @Input() user: User;

  // the name of the reviewer in the select
  reviewerUserKey: string;
  
  //@Output() refreshUserList = new EventEmitter();

  availableChargeCodeNamesFormGroup : FormGroup;

  constructor( private userService: UserService, private formBuilder: FormBuilder) {  }

  ngOnInit(): void {
    
    this.availableChargeCodeNamesFormGroup = this.formBuilder.group({
      chargeCodes: this.formBuilder.array([])
    });

    //get a string list of available charge codes
    this.availableChargeCodeNames = this.availableChargeCodes.map(a => a.name);

    //set already selected values
    if (this.user.chargeCodeNames) {
      const valuesFromServer = this.user.chargeCodeNames; 

      const formArray = this.availableChargeCodeNamesFormGroup.get('chargeCodes') as FormArray;
      valuesFromServer.forEach(x => {
        if(this.availableChargeCodeNames.indexOf(x) > -1) { 
          formArray.push(new FormControl(x));
        }
      });  
    }

    if (this.user.reviewerUserKey) {
      this.reviewerUserKey = this.user.reviewerUserKey;
    }

  }

  deleteUser() {
    this.userService.deleteUser(this.user);
    //this.refreshUserList.emit('');
  }

  onChange(event) {
    const userChargeCodes = this.availableChargeCodeNamesFormGroup.get('chargeCodes') as FormArray;

    if(event.checked) {
      userChargeCodes.push(new FormControl(event.source.value))
    } else {
      const i = userChargeCodes.controls.findIndex(x => x.value === event.source.value);
      userChargeCodes.removeAt(i);
    }
  }

  saveUser() {
    this.user.reviewerUserKey = this.reviewerUserKey;
    this.user.chargeCodeNames = [];
    this.user.chargeCodeNames = this.availableChargeCodeNamesFormGroup.value.chargeCodes;
    this.userService.updateUser(this.user);
    
  }

}
