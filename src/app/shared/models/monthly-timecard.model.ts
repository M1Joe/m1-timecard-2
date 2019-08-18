import { Activity } from "./activity.model";
import { PTO } from "./pto.model";

export class MonthlyTimecard {
  activities: Activity[];
  status: string;
  note: string;
  pto?: PTO;
}
