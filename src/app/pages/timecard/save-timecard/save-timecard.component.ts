import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentTimePeriod } from '@shared/models/current-time-period.model';
import { DateService } from '@shared/services/date.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';
import { FridaySaveDialogComponent } from './friday-save-dialog/friday-save-dialog.component';

@Component({
  selector: 'app-save-timecard',
  templateUrl: './save-timecard.component.html',
  styleUrls: ['./save-timecard.component.scss']
})
export class SaveTimecardComponent implements OnInit {
  

  @Output() requestToSaveTimecard: EventEmitter<string> = new EventEmitter();
  
  @Input() status: string;

  @Input() totalHoursLessThanAvailableHours: boolean;

  dialogRef: MatDialogRef<SubmitDialogComponent>;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    
  }
  
  
  saveTimecard() {
    this.requestToSaveTimecard.emit('DRAFT');

    var currentDay = (new Date()).getDay()
    if (currentDay === 5) { 
      // It's Friday!
      this.dialog.open(FridaySaveDialogComponent, {
        width: '600px',
      });
    }
      
  }

  submitTimecard() {
    this.dialogRef = this.dialog.open(SubmitDialogComponent, {
      width: '400px',
      data: {displayWarning: this.totalHoursLessThanAvailableHours}
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'SUBMIT') {
        this.requestToSaveTimecard.emit('SUBMITTED');
      } else {
      }
      
    });

  }

  



}
