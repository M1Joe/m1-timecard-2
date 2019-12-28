import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class AlertService {

  successWords = [
    'Awesome',
    'Awesome',
    'OK',
    'Nice',
    'OK',
    'OK',
    'OK',
    'OK',
    'OK',
    'OK',
    'Sweet'
  ];

  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  public showToaster(msg: string, userKey?: string): void {

    if (userKey) {
      
      this.successWords = [
        'Awesome',
        'Awesome',
        'OK',
        'Nice',
        'OK',
        'OK',
        'OK',
        'OK',
        'OK',
        'OK',
        'Sweet'
      ];
      
      switch (userKey) {
        case 'joe':
          this.successWords.push('Great timecard app!');
          break;
        case 'sarahtroy':
          this.successWords.push('Mush Mush');
          break;
        case 'joshsullivan':
          this.successWords.push('Killer!');
          break;
        case 'brian':
          this.successWords.push('DevOps FTW');
          break;
        case 'ben':
          this.successWords.push('Go Steelers');
          break;
      }
    }
    // zone fixes weird bug where snackbar opens in the wrong place, as described 
    // here: https://github.com/angular/components/issues/9875#issuecomment-375545786
    this.zone.run(() => {
      this.snackBar.open(msg, this.successWords[Math.floor(Math.random()*this.successWords.length)], {
        duration: 3500,
      });
    });
  }

}
