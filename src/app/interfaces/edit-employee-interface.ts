import { Employees } from "../models/employeesModel/employees.model";
import { AllowanceTypesViewModel } from "../models/viewModels/allowanceTypesViewModel/allowance-types-view-model.model";

export interface EditEmployeeInterface {
  employee: Employees;
  allowanceTypesViewModel: AllowanceTypesViewModel[];
  editFormSubmitted: boolean;
}
