import { ActionIcon, Group, Stack } from "@mantine/core";
import { MdDelete, MdDragIndicator, MdEdit, MdSort } from "react-icons/md";
import { TableColumn } from "@/@types/Table/TableColumn";
import { TableRowProps } from "@/@types/Table/TableRowProps";
import SortableItem from "./sortableItem";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { DraggableAttributes } from "@dnd-kit/core";
import { FC } from "react";

type Props = {
  columns: TableColumn[];
  row: any;
  bgColor?: string;
  listeners?: SyntheticListenerMap | undefined;
  attributes?: DraggableAttributes;
  children?: any;
};

export const TableRow: FC<Props> = ({
  children,
  attributes,
  listeners,
  ...props
}) => {
  // console.log("id: ", props.row.cells["id"].content);
  props.row.cells["dragButton"].content = (
    <ActionIcon {...listeners} {...attributes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 1024 1408"
      >
        <path
          fill="gray"
          d="M1024 896q0 26-19 45l-448 448q-19 19-45 19t-45-19L19 941Q0 922 0 896t19-45t45-19h896q26 0 45 19t19 45zm0-384q0 26-19 45t-45 19H64q-26 0-45-19T0 512t19-45L467 19q19-19 45-19t45 19l448 448q19 19 19 45z"
        />
      </svg>
    </ActionIcon>
  );

  return (
    <>
      {props.row &&
        props.columns?.map((column: TableColumn, index: number) => {
          const children = props.row.cells[column.field]?.content;
          const style = props.row.cells[column.field]?.style ?? null;
          return (
            <td key={index} style={style}>
              {children}
            </td>
          );
        })}
    </>
  );
};
