import { Button, Divider, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import {
  NewTableContext,
  TableContextInterface,
} from "@/components/contexts/TableContext";
import { TableFilterList } from "@/components/baseComponents/tableComponents/TableFilterList";
import { useTranslation } from "react-i18next";

export interface FilterFormValues {
  search?: string;
}

export const FiltersDrawer = () => {
  const { setPage, filter, setFilter } = useContext(
    NewTableContext
  ) as TableContextInterface;
  // const { t } = useTranslation();
  // Form varsayılanları
  const form = useForm({
    initialValues: {
      search: filter.search,
    },
  });

  const onFormSubmit = (values: FilterFormValues) => {
    setFilter({
      search: values.search,
    });
    setPage(1);
  };

  const onFormReset = () => {
    form.reset();
    form.setFieldValue("search", "");
    setFilter({
      search: "",
    });
    setPage(1);
  };

  return (
    <div>
      <Stack>
        <form
          action=""
          onSubmit={form.onSubmit((values) => {
            onFormSubmit(values);
          })}
        >
          <Stack>
            <TextInput
              name="search"
              size="xs"
              label={"Filter.call.call"}
              placeholder={"Filter.call.placeHolder"}
              {...form.getInputProps("search")}
              data-autofocus
            />
            <Group>
              <Button type="submit" size={"xs"}>
                {"Filter.call.applyBtnText"}
              </Button>
              <Button
                type="reset"
                variant="default"
                size={"xs"}
                onClick={() => onFormReset()}
              >
                {"Filter.call.resetBtnText"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
      <Stack>
        <Divider label={"Filter.driver.label"} mt={30} />
        <TableFilterList
          filterType="users_table"
          filterForm={form}
          filterSubmit={onFormSubmit}
        />
      </Stack>
    </div>
  );
};
