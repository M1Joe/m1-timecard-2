import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup  } from '@angular/forms';

import { UserService, EmailValidator, ChargeCode, User } from '@shared';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  public form: FormGroup;
  
  //@Output() userCreated: EventEmitter<any> = new EventEmitter();


  constructor(
    private userService: UserService,
    public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      displayName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],

    });
  }

  public onSubmit(form: NgForm) {
    
    const user: User = new User;
    user.displayName = form.value.displayName;
    user.email = form.value.email;
    
    this.userService.createUser(user);

    return true;
    
  }

}
