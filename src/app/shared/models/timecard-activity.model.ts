export class TimecardActivity {
  public name: string;
  public entry: Entry;
}

interface Entry {
  day: string;
  hours: string;
}