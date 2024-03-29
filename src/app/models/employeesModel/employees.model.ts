import { AbsencesOfEmployees } from "../absencesOfEmployeesModel/absences-of-employees.model";
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
    identityCardNumber: string;
    genderId: number;
    nameOfMother: string;
    postalCode: number;
    city: string;
    address: string;
    jobId: number;
    statusId: number;
    isDeleted: boolean;
    statuses: Statuses;
    allowanceOfEmployees: AllowancesOfEmployees[];
    jobs: Jobs;
    genders: Genders;
    users: Users;
    absencesOfEmployees: AbsencesOfEmployees[];
}
