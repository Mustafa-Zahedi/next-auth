import { User } from "./user";

export interface TasksTypes {
  id: number;
  uuid: string;
  title: string;
  description: string;
  assignedBy: string;
  assignedByUser: User;
  assignedTo: { userUuid: string; user: User }[];
  deadline: string;
  createdAt: string;
  status: string;
  entryId: string;
}
