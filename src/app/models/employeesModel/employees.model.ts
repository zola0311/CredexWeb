import { AllowancesOfEmployees } from "../allowancesOfEmployeesModel/allowances-of-employees.model";
import { Genders } from "../gendersModel/genders.model";
import { Jobs } from "../jobsModel/jobs.model";
import { Statuses } from "../statusesModel/statuses.model";
import { Users } from "../usersModel/users.model";
import { ValueStreams } from "../valueStreamsModel/value-streams.model";

export class Employees {
    employeeId: number;
    name: string;
    birthName: string;
    phoneNumber: string;
    indentityCardNumber: string;
    genderId: number;
    valueStreamId: number;
    nameOfMother: string;
    postalCode: number;
    city: string;
    address: string;
    jobId: number;
    statusId: number;
    isLeader: boolean;
    supervisorId: number;
    statuses: Statuses;
    allowanceOfEmployees: AllowancesOfEmployees[];
    jobs: Jobs;
    valueStreams: ValueStreams;
    genders: Genders;
    users: Users;
}
