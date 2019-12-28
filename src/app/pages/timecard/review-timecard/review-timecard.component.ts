import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';
import { PTO } from '@shared/models/pto.model';
import { AuthService } from '@shared/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-review-timecard',
  templateUrl: './review-timecard.component.html',
  styleUrls: ['./review-timecard.component.scss']
})
export class ReviewTimecardComponent implements OnInit {
  
  @Input() currentUser: User;
  @Input() totalHoursPTO: number;

  //currentUserKey: string; //key of current user that we are viewing/approving
  users$: Observable<User[]>;
  userArray: User[];

  pto: PTO = new PTO();
  
  oldBalance: string;
  oldAsOf: string;
  newAsOf: string;
  
  balance: string = '';
  asOf: string = '';

  @Output() requestToSaveTimecard: EventEmitter<Object> = new EventEmitter();

  @Output() requestToLoadTimecardForUser: EventEmitter<string> = new EventEmitter();

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    
    this.users$.pipe(take(1)).subscribe(users => this.userArray = users.filter(user => user.reviewerUserKey === this.authService.getUserKey(this.currentUser)));

    this.userService.getOfficialPto(this.authService.getUserKey(this.currentUser)).pipe(take(1)).subscribe(oldPto => {
      this.oldAsOf = oldPto.asOf;
      this.oldBalance = oldPto.balance;
    });

  }

  reviewTimecard() {
    this.requestToSaveTimecard.emit('REVIEWED');
  }

  rejectTimecard() {
    this.requestToSaveTimecard.emit('REJECTED');
  }


  // These two functions do the same thing, but one fires on selectionChange of the mat-select and the other on the "Next" button
  // They take different inputs.  These are a copy/paste of each other, which is wrong, but it works.
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

  loadTimecardForUser(user) {
    this.requestToLoadTimecardForUser.emit(user);
    
    this.oldAsOf = 'UNKNOWN';
    this.oldBalance = '-999';

    this.userService.getOfficialPto(this.authService.getUserKey(user)).pipe(take(1)).subscribe(oldPto => {
      if (oldPto) {
        this.oldAsOf = oldPto.asOf;
        this.oldBalance = oldPto.balance;
      }
    });
  }

  compareObjects(user1: User, user2: User): boolean {
    return user1.email === user2.email;
  }

  viewNextUser() {
    // This function allows an admin to view the next user's timecard.  
    // This is totally the wrong way to do this, but it works.
    let counter = 0;
    for (let user of this.userArray) {
      if (this.currentUser.email === user.email) {
        if (counter === this.userArray.length - 1) {
          this.currentUser = this.userArray[0];
        } else {
          this.currentUser = this.userArray[counter + 1];
        }   
        this.loadTimecardForUser(this.currentUser);
        return;
      }
      counter++;
    }
  }
}
