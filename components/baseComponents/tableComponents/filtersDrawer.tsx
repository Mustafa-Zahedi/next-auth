import { Button, Divider, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import {
  NewTableContext,
  TableContextInterface,
} from "../../contexts/TableContext";
import { TableFilterList } from "./TableFilterList";
import { useTranslation } from "react-i18next";

export interface FilterFormValues {
  search?: string;
  group?: string | string[] | undefined;
  name?: string;
  contains?: string;
  slug?: string;
}

export const FiltersDrawer = () => {
  const { setPage, filter, setFilter } = useContext(
    NewTableContext
  ) as TableContextInterface;
  const { t } = useTranslation();
  // Form varsayılanları
  const form = useForm({
    initialValues: {
      search: filter.search,
    },
  });

  const onFormSubmit = (values: FilterFormValues) => {
    setFilter({
      ...filter,
      search: values.search,
    });
    setPage(1);
  };

  const onFormReset = () => {
    form.reset();
    form.setFieldValue("search", "");
    setFilter({ ...filter, search: "" });
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
              label={t("Filter.search")}
              placeholder={t("Filter.call.placeHolder")}
              {...form.getInputProps("search")}
              data-autofocus
            />
            <Group>
              <Button type="submit" size={"xs"}>
                {t("Filter.call.applyBtnText")}
              </Button>
              <Button
                type="reset"
                variant="default"
                size={"xs"}
                onClick={() => onFormReset()}
              >
                {t("Filter.clean")}
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
      <Stack>
        <Divider label={t("Filter.saveBtn")} mt={30} />
        <TableFilterList
          filterType="users_table"
          filterForm={form}
          filterSubmit={onFormSubmit}
        />
      </Stack>
    </div>
  );
};
