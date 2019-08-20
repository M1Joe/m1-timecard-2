import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-policies-dialog',
  templateUrl: './policies-dialog.component.html',
  styleUrls: ['./policies-dialog.component.scss']
})
export class PoliciesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PoliciesDialogComponent>,
  ) { }
  
    ngOnInit() {
    }
  
    onClickClose(): void {
      this.dialogRef.close();
    }
}
