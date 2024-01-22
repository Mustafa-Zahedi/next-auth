import { Group, ActionIcon, Title } from "@mantine/core";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { TableOrderInterface } from "../../contexts/TableContext";

export interface TableColumnLabelInterface {
  label: string | React.ReactNode;
  field?: string;
  order?: TableOrderInterface;
  setOrder?: CallableFunction;
}

export const TableColumnLabel = (props: TableColumnLabelInterface) => {
  let orderIcon = null;

  if (props.order && props.field) {
    const orderParam = {
      [props.field as string]:
        props.order[props.field as string] == "desc" ? "asc" : "desc",
    };
    orderIcon = (
      <ActionIcon
        size={"xs"}
        onClick={() =>
          props.setOrder && props.order && props.field
            ? props.setOrder({
                [props.field]:
                  props.order[props.field] == "desc" ? "asc" : "desc",
              })
            : null
        }
      >
        {orderParam[props.field] == "desc" ? (
          <MdArrowUpward size={12} />
        ) : (
          <MdArrowDownward size={12} />
        )}
      </ActionIcon>
    );
  }

  return (
    <Group>
      <Title order={6}>{props.label}</Title>
      {orderIcon}
    </Group>
  );
};
