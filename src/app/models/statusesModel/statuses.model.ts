import { Employees } from "../employeesModel/employees.model";

export class Statuses {
    id: number;
    name: string;
    statusKey: string;
    isActive: boolean;
    employees: Employees[];
}
