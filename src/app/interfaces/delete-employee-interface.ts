import { Employees } from "../models/employeesModel/employees.model";

export interface DeleteEmployeeInterface {
  employee: Employees;
  deleteRequierd: boolean;
}
