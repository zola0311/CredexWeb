import { AllowanceTypes } from "../allowanceTypesModel/allowance-types.model";
import { Employees } from "../employeesModel/employees.model";

export class AllowancesOfEmployees {
    id: number;
    employeeId: number;
    allowanceTypeId: string;
    value: number;
    employees: Employees;
    allowanceTypes: AllowanceTypes;
}
