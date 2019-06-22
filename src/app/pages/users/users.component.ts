import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup, FormControl  } from '@angular/forms';

import { UserService, User, ChargeCode } from '@shared';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  users : User[];

  availableChargeCodes: ChargeCode[];

  
  constructor( private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.availableChargeCodes = this.userService.getChargeCodes();
  }

  deleteUser(displayName: string) {
    this.userService.deleteUser(displayName);
    this.refreshUserList();
  }

  

  public refreshUserList() {
    this.users = this.userService.getUsers();
  }

}
