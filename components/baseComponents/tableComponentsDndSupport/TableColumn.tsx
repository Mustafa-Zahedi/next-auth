import { useTranslation } from "react-i18next";
import { TableColumnProps } from "@/@types/Table/TableColumnProps";

export const TableColumn = (props: TableColumnProps) => {
  return <th style={props.column.style}>{props.column.label}</th>;
};
