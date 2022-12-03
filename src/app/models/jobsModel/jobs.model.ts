import { Employees } from "../employeesModel/employees.model";

export class Jobs {
    id: number;
    name: string;
    jobKey: string;
    salary: number;
    valueStreamId: number;
    employees: Employees[];
}
