import { AbsencesTypes } from "../absencesTypesModel/absences-types.model";
import { Employees } from "../employeesModel/employees.model";

export class AbsencesOfEmployees {
  id: number;
  employeeId: number;
  date: Date;
  absenceTypeId: number;
  employees: Employees;
  absenceTypes: AbsencesTypes;
}
