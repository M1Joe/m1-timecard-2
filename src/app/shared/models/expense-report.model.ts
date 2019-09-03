export class ExpenseReport {
  id: string;
  fromDate: string;
  dateSubmitted: string;
  toDate: string;
  
  amount: string;
  description: string;
  reimburseable: boolean;
  contract: string;

  status: string;
  userKey: string;

  type: string;
  fromLocation?: string;
  toLocation?: string;
  roundTrip?: boolean;
  mileage?: string;
  mileageRate?: string;
  tolls?: string;


  keyYearMonth: string;
  keyYearMonthUser: string;
  keyYearMonthStatus: string;
  keyYearMonthUserStatus: string;
  
}
