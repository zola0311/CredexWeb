import { AllowancesOfEmployees } from "../allowancesOfEmployeesModel/allowances-of-employees.model";
import { Genders } from "../gendersModel/genders.model";
import { Jobs } from "../jobsModel/jobs.model";
import { Statuses } from "../statusesModel/statuses.model";
import { Users } from "../usersModel/users.model";

export class Employees {
    employeeId: number;
    name: string;
    birthName: string;
    phoneNumber: string;
    indentityCardNumber: string;
    genderId: number;
    nameOfMother: string;
    postalCode: number;
    city: string;
    address: string;
    jobId: number;
    statusId: number;
    statuses: Statuses;
    allowanceOfEmployees: AllowancesOfEmployees[];
    jobs: Jobs;
    genders: Genders;
    users: Users;
}
