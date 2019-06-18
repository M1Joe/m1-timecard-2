import { ChargeCode } from "./charge-code.model";

export class User {
  public displayName: string;
  public email: string;
  public bio: any;
  public image: any;
  public uid: any;
  public chargeCodes: ChargeCode[];
}
