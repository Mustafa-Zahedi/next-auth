// import { useLazyQuery, useCustomMutation } from "@apollo/client";
import { useEffect } from "react";
import { FILTERS } from "@/queries/filter/filters";
import { CREATE_FILTER } from "@/queries/filter/createFilter";
import { DELETE_FILTER } from "@/queries/filter/deleteFilter";
// import { useForm } from "@mantine/hooks";
// import { useForm } from "@mantine/form";

import {
  ActionIcon,
  Button,
  Group,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { MdDelete } from "react-icons/md";
import * as Yup from "yup";
import { showNotification } from "@mantine/notifications";
import { TableFilterInterface } from "../../contexts/TableContext";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { yupResolver } from "@mantine/form";
import useCustomMutation from "@/hooks/useCustomMutation";
import useCustomLazyQuery from "@/hooks/useCustomLazyQuery";

export interface TableFilterListProps {
  filterType?: string;
  filterForm?: any;
  filterSubmit: CallableFunction;
  showFilterSave?: boolean;
  setShowFilterSave?: CallableFunction;
}

export const TableFilterList = (props: TableFilterListProps) => {
  const { t } = useTranslation();
  const [
    runFiltersQuery,
    { data: filterData, loading: filterLoading, error: filterError, refetch },
  ] = useCustomLazyQuery({ query: FILTERS });

  const [runCreateFilterMutation] = useCustomMutation({
    mutation: CREATE_FILTER,
  });
  const [runDeleteFilterMutation] = useCustomMutation({
    mutation: DELETE_FILTER,
  });

  useEffect(() => {
    refreshFilters();
  }, []);

  const refreshFilters = () => {
    runFiltersQuery({
      fetchPolicy: "network-only",
      variables: {
        type: props.filterType,
      },
    });
  };

  const schema = Yup.object().shape({
    title: Yup.string()
      .min(2)
      .max(256)
      .label(t("title"))
      .required("title is required"),
  });

  const filterSaveForm = useFormik({
    validationSchema: schema,
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      handleFilterSave({
        title: values.title,
        filter: props.filterForm.values,
      });
    },
  });

  /**
   * Kullanıcı filtersini kayder
   * @param values Filtre parametreleri
   */
  const handleFilterSave = (values: any) => {
    // console.log("values:", values);

    runCreateFilterMutation({
      variables: {
        type: props.filterType,
        title: values.title,
        filter: values.filter,
      },
      onCompleted: () => {
        refetch();
        showNotification({
          title: t(`ok`),
          message: t(`FilterCreated`),
          autoClose: true,
          color: "green",
        });
      },
      onError: (error: any) => {
        showNotification({
          title: t(`error`),
          message: `${t("errorCreateMsg")}\n${error.message}`,
          autoClose: true,
          color: "red",
        });
      },
    });
  };

  const handleFilterDelete = (uuid: string) => {
    runDeleteFilterMutation({
      variables: {
        uuid: uuid,
      },
      onCompleted: (data: any) => {
        refreshFilters();
        showNotification({
          title: t(`ok`),
          message: t(`FilterDeleted`),
          autoClose: true,
          color: "green",
        });
      },
      onError: (error: any) => {
        showNotification({
          title: t(`error`),
          message: `${t("errorDeleteMsg")}\n${error.message}`,
          autoClose: true,
          color: "red",
        });
      },
    });
  };

  const handleFilterSelect = (filter: any) => {
    props.filterForm.setValues(filter.filter);
    props.filterSubmit(filter.filter);
  };

  return (
    <>
      <form
        // hidden={!props.showFilterSave}
        onSubmit={filterSaveForm.handleSubmit}
      >
        <Group style={{ alignItems: "flex-start" }}>
          <TextInput
            name="title"
            size="xs"
            style={{ flex: 1 }}
            placeholder={t("Filter.call.title")}
            onChange={filterSaveForm.handleChange}
            defaultValue={filterSaveForm.values.title}
            error={filterSaveForm.errors.title}
          />
          <Button size="xs" variant="outline" type="submit">
            {t("Filter.saveBtn")}
          </Button>
        </Group>
      </form>
      {filterData && filterData.filters.length > 0 ? (
        <Table verticalSpacing="xs" fz="xs" className="saved-filters-table">
          <tbody>
            {filterData.filters.map((filter: any) => {
              return (
                <tr key={filter.uuid}>
                  <td>
                    <Text
                      variant="link"
                      component="a"
                      href="#"
                      size="xs"
                      onClick={() => handleFilterSelect(filter)}
                    >
                      {t(filter.title)}
                    </Text>
                  </td>
                  <td align="right">
                    <ActionIcon>
                      <MdDelete
                        color={"red"}
                        size={16}
                        onClick={() => handleFilterDelete(filter.uuid)}
                      />
                    </ActionIcon>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Text size="xs" color={"gray"}>
          {t("Filter.driver.message")}
        </Text>
      )}
    </>
  );
};
