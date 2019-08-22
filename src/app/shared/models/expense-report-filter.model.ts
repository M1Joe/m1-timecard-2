import { User } from "./user.model";

export class ExpenseReportFilter {
    public selectedMonth: string;
    public selectedYear: string;
    public user: User;
    public status: string;
}