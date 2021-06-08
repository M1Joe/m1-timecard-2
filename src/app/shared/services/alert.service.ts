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

  constructor(private snackBar: MatSnackBar, private zone: NgZone) { }

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
        'Sweet',
        'Yay'
      ];

      switch (userKey) {
        case 'joe':
          this.successWords.push('Great timecard app!');
          this.successWords.push('Successfully connected to DAS');
          break;
        case 'sarahtroy':
          this.successWords.push('Mew Mew');
          this.successWords.push('Go Steelers');
          break;
        case 'joshsullivan':
          this.successWords.push('HODL');
          break;
        case 'brian':
          this.successWords.push('DevOps FTW');
          this.successWords.push('HODL');
          this.successWords.push('ADA FTW');
          this.successWords.push('Successfully connected to DAS');
          break;
        case 'suren':
          this.successWords.push('Successfully connected to DAS');
          this.successWords.push('Lets go Patriots!');
          this.successWords.push('HODL');
          break;
        case 'ben':
          this.successWords.push('Go Steelers');
          break;
        case 'anastasiadeboe':
          this.successWords.push('Lets go CAPS!');
          break;
        case 'tycarlson':
          this.successWords.push('Lets Go Mason!');
          break;
        case 'loisbriscoe':
          this.successWords.push('TEST PASSED!');
          break;
        case 'justinrand':
          this.successWords.push('Lets Go Pens!');
          break;
        case 'davidnewton':
          this.successWords.push('HODL');
          this.successWords.push('Ada FTW');
          break;
        case 'andrewcohilas':
          this.successWords.push('HODL');
          this.successWords.push('You have diamond hands');
          break;
        case 'jeffvandenbergh':
          this.successWords.push('Lets go Sabres');
          break;
      }
    }
    // zone fixes weird bug where snackbar opens in the wrong place, as described 
    // here: https://github.com/angular/components/issues/9875#issuecomment-375545786
    this.zone.run(() => {
      this.snackBar.open(msg, this.successWords[Math.floor(Math.random() * this.successWords.length)], {
        duration: 3500,
      });
    });
  }

}
