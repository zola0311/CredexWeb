import { AllowancesOfEmployees } from "../allowancesOfEmployeesModel/allowances-of-employees.model";
import { Employees } from "../employeesModel/employees.model";

export class EmployeeAndAllowancesOfEmployees {
  employee: Employees;
  allowancesOfEmployees: AllowancesOfEmployees[];
}
