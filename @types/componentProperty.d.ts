import { ComponentTypes } from "./component";

export interface ComponentPropertyType {
  id: number;
  uuid: string;
  name: string;
  value: value[];
  type: string;
  component: ComponentTypes;
  data_table_column?: string;
  // data_table?: string;
  // data_table_row?: "all" | "5" | "-5";
  // data_table_rows?: [string];
}
interface value {
  columnUuid;
  id;
  uuid;
  value;
  // data_table_rows;
  // data_table_column;
  componentPropertyUuid;
}
