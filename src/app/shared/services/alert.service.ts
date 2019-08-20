import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class AlertService {

  successWords = [
    'Awesome',
    'OK',
    'Nice',
    'OK',
    'OK'
  ];

  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  public showToaster(msg: string): void {
    // zone fixes weird bug where snackbar opens in the wrong place, as described 
    // here: https://github.com/angular/components/issues/9875#issuecomment-375545786
    this.zone.run(() => {
      this.snackBar.open(msg, this.successWords[Math.floor(Math.random()*this.successWords.length)], {
        duration: 3500,
      });
    });
  }

}
