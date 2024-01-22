import { Button, Checkbox, Select, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { DEFAULT_TAKE, DEFAULT_TAKES } from "./config";
import {
  NewTableContext,
  TableContextInterface,
} from "@/components/contexts/TableContext";
import { useTranslation } from "react-i18next";
import { LayoutColTypes } from "@/@types/Table/layoutColumns";

export interface SettingsFormValues {
  take: number;
}

export const SettingsDrawer = () => {
  // const { take, setTake, setPage } = useContext(NewTableContext) as TableContextInterface;
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

  const onFormSubmit = (values: SettingsFormValues) => {
    setTake(values.take);
    setPage(1);
  };

  const handleColCheck = (col: LayoutColTypes) => {
    col.visible = col.visible ? false : true;
    const temp = columns.map((colmn) =>
      colmn.field === col.field ? col : colmn
    );
    setColumns && setColumns(temp);
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
          label={t("Settings.label")}
          // data={DEFAULT_TAKES}

          data={DEFAULT_TAKES as []}
          {...form.getInputProps("take")}
        />
      </Stack>

      <article style={{ marginTop: "1rem" }}>
        <h5>Columns</h5>
        {columns.map((col, index) => (
          <div
            key={index}
            style={{ display: "flex", marginBottom: "5px", gap: "5px" }}
          >
            <Checkbox
              size="xs"
              onChange={() => handleColCheck(col)}
              checked={col.visible}
            />
            <span>{col.field}</span>
          </div>
        ))}
      </article>
      <Button type="submit" size={"xs"}>
        {t("Settings.btnText")}
      </Button>
    </form>
  );
};
