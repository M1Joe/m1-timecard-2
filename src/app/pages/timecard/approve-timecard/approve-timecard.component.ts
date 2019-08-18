import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';
import { PTO } from '@shared/models/pto.model';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-approve-timecard',
  templateUrl: './approve-timecard.component.html',
  styleUrls: ['./approve-timecard.component.scss']
})
export class ApproveTimecardComponent implements OnInit {
  
  @Input() currentUser: User;

  //currentUserKey: string; //key of current user that we are viewing/approving
  users$: Observable<User[]>;

  pto: PTO = new PTO();
  balance: string = '';
  asOf: string = '';

  @Output() requestToApproveTimecard: EventEmitter<Object> = new EventEmitter();
  @Output() requestToSaveTimecard: EventEmitter<Object> = new EventEmitter();
  
  @Output() requestToLoadTimecardForUser: EventEmitter<string> = new EventEmitter();


  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  approveTimecard() {
    this.pto.balance = this.balance;
    this.pto.asOf = this.asOf;
    this.requestToApproveTimecard.emit({user: this.currentUser, status: 'APPROVED', pto: this.pto});
    this.balance = '';
    this.asOf = '';
  }

  rejectTimecard() {
    this.requestToSaveTimecard.emit('REJECTED');
  }

  loadTimecardFor(event) {
    this.requestToLoadTimecardForUser.emit(event.value);
  }

  compareObjects(user1: User, user2: User): boolean {
    return user1.email === user2.email;
  }


}
