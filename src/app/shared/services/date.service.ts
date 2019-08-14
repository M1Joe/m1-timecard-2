import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() {}

  public isWeekend(year: number, month: number, day: number) {
    var date = new Date(year, month-1, day);
    var day = date.getDay();
    return day === 0 || day === 6;
  }
  
}
