import { TableColumn } from "../../baseComponents/tableComponents/TableColumn";
// import { TableRow } from "./TableRow";

export interface TableRowProps {
  columns: TableColumn[];
  row: TableRow;
  bgColor?: string;
}
