import { ChargeCode } from "./charge-code.model";

export class User {
  public displayName: string;
  public email: string;
  public percentEmployed?: number;
  public uid: any;
  public chargeCodeNames?: string[];
  public reviewerUserKey?: string;
}
