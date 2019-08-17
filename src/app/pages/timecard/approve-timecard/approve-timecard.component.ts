import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { DateService } from '@shared/services/date.service';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';
import { PTO } from '@shared/models/pto.model';

@Component({
  selector: 'app-approve-timecard',
  templateUrl: './approve-timecard.component.html',
  styleUrls: ['./approve-timecard.component.scss']
})
export class ApproveTimecardComponent implements OnInit {
  
  currentUserKey: string; //key of current user that we are viewing/approving
  users$: Observable<User[]>;

  pto: PTO;

  @Output() requestToApproveTimecard: EventEmitter<Object> = new EventEmitter();
  @Output() requestToLoadTimecardForUser: EventEmitter<string> = new EventEmitter();


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  approveTimecard() {
    this.requestToApproveTimecard.emit({userKey: this.currentUserKey, status: 'APPROVED'});
  }

  loadTimecardFor(event) {
    this.currentUserKey = event.value;
    this.requestToLoadTimecardForUser.emit(event.value);
  }


}
