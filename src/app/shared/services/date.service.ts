import { Injectable } from '@angular/core';
import { S } from '@angular/cdk/keycodes';

@Injectable()
export class DateService {

  constructor() {}

  public isWeekend(year: number, month: number, day: number) {
    var date = new Date(year, month-1, day);
    var day = date.getDay();
    return day === 0 || day === 6;
  }

  public getDay(year: number, month: number, day: number): string {
    var date = new Date(year, month-1, day);
    var day = date.getDay();
    switch(day) {
      case 0: return 'Su';
      case 1: return 'M';
      case 2: return 'T';
      case 3: return 'W';
      case 4: return 'R';
      case 5: return 'F';
      case 6: return 'Sa';
    }
  }
  
}
