export class MonthlyTimecard {
  activities: Activity[];
  status: string;
  note: string;
}

interface Activity {
  name: string;
  entries: Entry[];
}

interface Entry {
  day: string;
  hours: string;
}