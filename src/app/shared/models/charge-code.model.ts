export class ChargeCode {
  public name: string;
  public type: Type;

  public startDay: string;
  public startMonth: string;
  public startYear: string;
  
  public endDay: string;
  public endMonth: string;
  public endYear: string;  
}

enum Type {
  BILLABLE = "BILLABLE",
  ADMIN = "ADMIN",
  MARKETING = "MARKING",
  PROPOSAL = "PROPOSAL",
  PTO = "PTO",
}
