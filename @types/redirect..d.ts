import { ComponentTypes } from "./component";
import { Entry } from "./entry";

export interface Redirect {
  id: number;
  uuid: string;
  key: string;
  target: string;
  isActive: boolean;
  entryUuid: string;
  createdAt: Date;
  entry: Entry;
}
