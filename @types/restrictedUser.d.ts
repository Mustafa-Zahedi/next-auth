import { ComponentTypes } from "./component";
import { EndUserType } from "./endUser";
import { Entry } from "./entry";

export interface RestrictedUser {
  id: number;
  uuid: string;
  ipAddress: string;
  description: string;
  banned: boolean;
  report: boolean;
  comment: boolean;
  createdAt: Date;
  duration: number;
  user: EndUserType;
}

// uuid
// userUuid
// report
// ipAddress
// duration
// comment
// description
// id
// user {
//   avatar
//   bio
//   email
//   uuid
// }
