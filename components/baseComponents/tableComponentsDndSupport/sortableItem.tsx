import React, { ReactPortal } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  children: string | React.ReactNode | ReactPortal | any;
  id: string;
};

export default function SortableItem({ children, id }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style}>
      {children && React.cloneElement(children, { attributes: { ...attributes }, listeners: { ...listeners } })}
    </tr>
  );
}
