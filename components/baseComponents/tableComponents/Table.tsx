import { Skeleton, Table as MantineTable } from "@mantine/core";
import { TableRow } from "./TableRow";
import { TableColumn } from "./TableColumn";
import { TableProps } from "@/@types/Table/TableProps";

export const Table = (props: TableProps) => {
  // Rows boş ise skeleton ile doldur
  const rows = props.rows
    ? props.rows
    : Array(props.take)
        .fill(0)
        .map(() => {
          const row = {
            cells: {},
          };
          props.columns?.map((column) => {
            row.cells = {
              ...row.cells,
              [column.field]: { content: <Skeleton height={15} py={11} /> },
            };
          });
        });

  return (
    <MantineTable striped highlightOnHover verticalSpacing="xs" fz="xs">
      <thead>
        <tr>
          {!props?.hasHeader &&
            props.columns?.map((column, index: number) => {
              return <TableColumn key={index} column={column} />;
            })}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row, index: number) => {
            return <TableRow key={index} columns={props.columns} row={row} />;
          })}
      </tbody>
    </MantineTable>
  );
};
