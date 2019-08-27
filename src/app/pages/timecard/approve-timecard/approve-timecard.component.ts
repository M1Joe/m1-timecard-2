import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';
import { PTO } from '@shared/models/pto.model';
import { AuthService } from '@shared/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-approve-timecard',
  templateUrl: './approve-timecard.component.html',
  styleUrls: ['./approve-timecard.component.scss']
})
export class ApproveTimecardComponent implements OnInit {
  
  @Input() currentUser: User;
  @Input() totalHoursPTO: number;

  //currentUserKey: string; //key of current user that we are viewing/approving
  users$: Observable<User[]>;

  pto: PTO = new PTO();
  
  oldBalance: string;
  oldAsOf: string;
  newAsOf: string;
  
  balance: string = '';
  asOf: string = '';

  @Output() requestToApproveTimecard: EventEmitter<Object> = new EventEmitter();
  @Output() requestToSaveTimecard: EventEmitter<Object> = new EventEmitter();
  
  @Output() requestToLoadTimecardForUser: EventEmitter<string> = new EventEmitter();


  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    this.userService.getOfficialPto(this.authService.getUserKey(this.currentUser)).pipe(take(1)).subscribe(oldPto => {
      this.oldAsOf = oldPto.asOf;
      this.oldBalance = oldPto.balance;
    });

    console.log('pto' + this.totalHoursPTO);
  }

  approveTimecard() {
    this.pto.balance = this.balance;
    this.pto.asOf = this.asOf;
    this.requestToApproveTimecard.emit({user: this.currentUser, status: 'APPROVED', pto: this.pto});
    this.oldBalance = this.balance;
    this.oldAsOf = this.asOf;
    this.balance = '';
    this.asOf = '';
  }

  rejectTimecard() {
    this.requestToSaveTimecard.emit('REJECTED');
  }

  loadTimecardFor(event) {
    this.requestToLoadTimecardForUser.emit(event.value);
    
    this.oldAsOf = 'UNKNOWN';
    this.oldBalance = '-999';

    this.userService.getOfficialPto(this.authService.getUserKey(event.value)).pipe(take(1)).subscribe(oldPto => {
      if (oldPto) {
        this.oldAsOf = oldPto.asOf;
        this.oldBalance = oldPto.balance;
      }
      
    });
    
  }

  compareObjects(user1: User, user2: User): boolean {
    return user1.email === user2.email;
  }

  populateBalanceAndAsOf() {
    this.asOf = this.newAsOf;
    this.balance = this.calculatePto().toString();
  }

  calculatePto() {
    var newBalance = +this.oldBalance + 11.67 - this.totalHoursPTO;
    return newBalance.toFixed(2);
  }
}
