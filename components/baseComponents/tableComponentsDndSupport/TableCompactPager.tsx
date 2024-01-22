import {
  Paper,
  Group,
  ActionIcon,
  Menu,
  Button,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import {
  MdArrowLeft,
  MdFirstPage,
  MdLastPage,
  MdKeyboardReturn,
  MdArrowRight,
} from "react-icons/md";
import {
  NewTableContext,
  TableContextInterface,
} from "../../contexts/TableContext";

export const TableCompactPager = () => {
  const { page, setPage, totalPages, setCheckeds } = useContext(
    NewTableContext
  ) as TableContextInterface;

  const onPrev = () => {
    setCheckeds([]);
    setPage(page > 1 ? page - 1 : 1);
  };

  const onNext = () => {
    setCheckeds([]);
    setPage(page < totalPages ? page + 1 : totalPages);
  };

  const form = useForm({
    initialValues: {
      page: page,
    },
  });

  return (
    <Paper withBorder>
      <Group>
        <ActionIcon onClick={onPrev}>
          <MdArrowLeft size={22} />
        </ActionIcon>
        <Menu closeOnItemClick={false} position="bottom-end">
          <Menu.Target>
            <Button
              size="xs"
              variant="subtle"
              color="gray"
              style={{ height: 28 }}
            >
              {page} / {totalPages}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<MdFirstPage />}
              onClick={() => {
                setCheckeds([]);
                setPage(1);
              }}
            >
              İlk sayfaya git
            </Menu.Item>
            <Menu.Item
              leftSection={<MdLastPage />}
              onClick={() => {
                setCheckeds([]);
                setPage(totalPages);
              }}
            >
              Son sayfaya git
            </Menu.Item>
            <Menu.Item>
              <form
                onSubmit={form.onSubmit((values) => {
                  setCheckeds([]);
                  if (values.page < 1) {
                    setPage(1);
                  } else if (values.page > totalPages) {
                    setPage(totalPages);
                  } else {
                    setPage(values.page);
                  }
                })}
              >
                <NumberInput
                  size="xs"
                  placeholder="Sayfaya git"
                  name="page"
                  rightSection={<MdKeyboardReturn />}
                  {...form.getInputProps("page")}
                />
              </form>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <ActionIcon onClick={onNext}>
          <MdArrowRight size={22} />
        </ActionIcon>
      </Group>
    </Paper>
  );
};
