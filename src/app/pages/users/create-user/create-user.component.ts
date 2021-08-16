import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup  } from '@angular/forms';

import { UserService, EmailValidator, ChargeCode, User, AuthService } from '@shared';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  public form: FormGroup;
  
  //@Output() userCreated: EventEmitter<any> = new EventEmitter();


  constructor(
    private authService: AuthService,
    private userService: UserService,
    public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      displayName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      percentEmployed: [1, Validators.compose([Validators.required])]
    });
  }

  public onSubmit(form: NgForm) {
    
    const user: User = new User;
    user.displayName = form.value.displayName;
    user.email = form.value.email;
    user.percentEmployed = form.value.percentEmployed;
    
    this.userService.createUser(user);
    this.userService.setPercentEmployed(this.authService.getUserKey(user), user.percentEmployed)

    return true;
    
  }

}
