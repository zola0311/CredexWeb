import { Jobs } from "../models/jobsModel/jobs.model";

export interface EditJobInterface {
  job: Jobs,
  editFormSubmitted: boolean
}
