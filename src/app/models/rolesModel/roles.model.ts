import { Users } from "../usersModel/users.model";

export class Roles {
    id: number;
    name: string;
    roleKey: string;
    users: Users[];
}
