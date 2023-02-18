import { Employees } from "../models/employeesModel/employees.model";
import { AllowanceTypesViewModel } from "../models/viewModels/allowanceTypesViewModel/allowance-types-view-model.model";

export interface AddEmployeeInterface {
  employee: Employees;
  allowanceTypesViewModel: AllowanceTypesViewModel[]
}
