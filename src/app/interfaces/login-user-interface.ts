import { Users } from "../models/usersModel/users.model";

export interface LoginUserInterface {
  user: Users,
  loggedIn: boolean
}
