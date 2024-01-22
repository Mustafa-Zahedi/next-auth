import { Skeleton, Table as MantineTable } from "@mantine/core";
import { TableRow } from "./TableRow";
import { TableColumn } from "./TableColumn";
import { TableProps } from "@/@types/Table/TableProps";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import StaticRow from "./staticRow";
import SortableItem from "./sortableItem";

export const Table = (props: TableProps) => {
  // const [selectedRow, setSelectedRow] = useState<any>(null);
  const [items, setItems] = useState(["1", "2", "3"]);

  // console.log(props.rows);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: any) {
    // alert("darg start");
    const { active } = event;
    props?.setActiveId && props.setActiveId(active.id);
  }

  // console.log(props.activeId);

  // function handleDragEnd(event: any) {
  //   const { active, over } = event;

  //   if (active.id !== over.id) {
  //     setItems((items) => {
  //       const oldIndex = items.indexOf(active.id);
  //       const newIndex = items.indexOf(over.id);

  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }

  //   setActiveId(null);
  // }

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

  const getRowsById = (rows: any[], id: string | number) => {
    return rows.find((row) => row.cells["id"].content === id);
  };

  const row = props.activeId && getRowsById(rows, +props.activeId);
  const rowsWithId = rows.map((row) => {
    return { id: row.cells["id"].content };
  });
  // console.log("before return: ", row);

  return (
    <MantineTable striped highlightOnHover verticalSpacing="xs" fz={"xs"}>
      <thead>
        <tr>
          {props.columns?.map((column, index: number) => {
            return <TableColumn key={index} column={column} />;
          })}
        </tr>
      </thead>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={props.handleDragEnd}
      >
        <tbody>
          <SortableContext
            items={rowsWithId}
            strategy={verticalListSortingStrategy}
          >
            {rows.map((row, index) => (
              <SortableItem key={index} id={row.cells["id"].content}>
                <TableRow columns={props.columns} row={row} />
              </SortableItem>
            ))}
          </SortableContext>
        </tbody>
        {/* <DragOverlay>{props.activeId && row && <StaticRow row={row} />}</DragOverlay> */}
      </DndContext>
    </MantineTable>
  );
};
