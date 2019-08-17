import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { DateService } from '@shared/services/date.service';
import { UserService } from '@shared/services/user.service';
import { PTO } from '@shared/models/pto.model';
import { AuthService } from '@shared/';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-pto',
  templateUrl: './pto.component.html',
  styleUrls: ['./pto.component.scss']
})
export class PtoComponent implements OnInit {

  pto$: Observable<PTO>;

  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {}
  
  ngOnInit() {
    this.pto$ = this.userService.getPto(this.authService.getUserKey());
  }

  


}
