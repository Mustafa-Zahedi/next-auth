import { ActionIcon, Group, Stack } from "@mantine/core";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import { TableColumn } from "@/@types/Table/TableColumn";
import { TableRowProps } from "@/@types/Table/TableRowProps";

export const TableRow = (props: TableRowProps) => {
  const nestedTable = props.row?.nestedTable;

  return (
    <>
      <tr style={{}}>
        {props.row &&
          props.columns?.map((column: TableColumn, index: number) => {
            const children = props.row.cells[column.field]?.content;
            const style = props.row.cells[column.field]?.style ?? null;
            // console.log("child::", props);
            return (
              <td key={index} style={style}>
                {children}
              </td>
            );
          })}
      </tr>
      {nestedTable && (
        <td colSpan={props.columns.length} style={{}}>
          <Stack pl={50}>{nestedTable}</Stack>
        </td>
      )}
    </>
  );
};
