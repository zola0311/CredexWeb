import { Users } from "../models/usersModel/users.model";

export interface EditUserInterface {
  user: Users,
  editFormSubmitted: boolean
}
