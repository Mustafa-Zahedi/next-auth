import { Button, Checkbox, Flex, Select, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";
import {
  DEFAULT_TAKE,
  DEFAULT_TAKES,
} from "@/components/baseComponents/config";
import {
  NewTableContext,
  TableContextInterface,
} from "@/components/contexts/TableContext";
import { TableColType } from "@/@types/Table/TableColumns";
import { useTranslation } from "react-i18next";

export interface SettingsFormValues {
  take: number;
}

export const SettingsDrawer = () => {
  const { take, setTake, setPage, columns, setColumns } = useContext(
    NewTableContext
  ) as TableContextInterface;
  const { t } = useTranslation();
  // Form varsayılanları
  const form = useForm<SettingsFormValues>({
    initialValues: {
      take: take ?? DEFAULT_TAKE,
    },
  });
  const [temp, setTemp] = useState<unknown>(columns);

  const onFormSubmit = (values: SettingsFormValues) => {
    setTake(values.take);
    setPage(1);
    setColumns?.(temp);
  };

  const handleColCheck = (col: TableColType) => {
    col.visible = col.visible ? false : true;
    const temp = columns?.map((colmn) =>
      colmn.field === col.field ? col : colmn
    );
    setTemp(temp);
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onFormSubmit(values);
      })}
    >
      <Stack>
        <Select
          name="take"
          size="xs"
          label={t("TaxonomyType.settingsGroup.label")}
          data={DEFAULT_TAKES as []}
          {...form.getInputProps("take")}
        />
      </Stack>
      <Flex direction="column" my="sm">
        <Title order={6} mb="xs">
          {t("columns")}
        </Title>
        {columns?.map((col, index) => (
          <Flex
            key={index}
            style={{ display: "flex", marginBottom: "5px", gap: "5px" }}
          >
            <Checkbox
              size="xs"
              onChange={() => handleColCheck(col)}
              checked={col.visible}
            />
          </Flex>
        ))}
      </Flex>
      <div>
        <Button type="submit" size={"xs"}>
          {t("TaxonomyType.settingsGroup.apply")}
        </Button>
      </div>
    </form>
  );
};
