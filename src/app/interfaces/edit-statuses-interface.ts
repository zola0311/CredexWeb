import { Statuses } from "../models/statusesModel/statuses.model";

export interface EditStatusesInterface {
  status: Statuses,
  editFormSubmitted: boolean
}
