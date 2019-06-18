import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup  } from '@angular/forms';

import { UserService, User } from '@shared';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  users : User[];
  
  constructor( private userService: UserService) {
    //private userService: UserService
    // public formBuilder: FormBuilder) {
    // this.form = formBuilder.group({
    //   email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    // });
  }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    console.log(this.users);
  }

  deleteUser(displayName: string) {
    this.userService.deleteUser(displayName);
    this.refreshUserList();
  }

  // public onSubmit(form: NgForm) {
  //   const email = form.value.email;
  //   return this.userService.keepInTouch(email);
  // }

  public refreshUserList() {
    this.users = this.userService.getUsers();
  }
}
