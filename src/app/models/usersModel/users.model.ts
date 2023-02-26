import { Employees } from "../employeesModel/employees.model";
import { Roles } from "../rolesModel/roles.model";

export class Users {
    id: number;
    email: string;
    password: string;
    roleId: number;
    roles: Roles;
}
