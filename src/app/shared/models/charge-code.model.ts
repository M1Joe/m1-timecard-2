export class ChargeCode {
  public name: string;
  public type: Type;

  public startDay: number;
  public startMonth: number;
  public startYear: number;
  
  public endDay: number;
  public endMonth: number;
  public endYear: number;  
}

enum Type {
  BILLABLE = "BILLABLE",
  ADMIN = "ADMIN",
  MARKETING = "MARKING",
  PROPOSAL = "PROPOSAL",
  PTO = "PTO",
  HOLIDAY = "HOLIDAY"
}
