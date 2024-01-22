"use client";

import {
  ActionIcon,
  Avatar,
  Center,
  Checkbox,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";

import { useEffect, useState } from "react";
import { DEFAULT_TAKE } from "./config";
import {
  NewTableContext,
  TableFilterInterface,
  TableOrderInterface,
} from "@/components/contexts/TableContext";
import { Toolbar } from "./toolbar";
import { MdDelete, MdEdit, MdErrorOutline } from "react-icons/md";
import { Table } from "@/components/baseComponents/tableComponents/Table";
import { TableAlert } from "@/components/baseComponents/tableComponents/TableAlert";
import { TableColumnLabel } from "@/components/baseComponents/tableComponents/TableColumnLabel";
import Link from "next/link";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { LayoutColTypes } from "@/@types/Table/layoutColumns";
import { equalsCheck } from "@/utils/equalsArray";
import { AllUsersType } from "@/@types/allUsersType";
import { USERS } from "@/queries/user/user/usersQuery";
import { useRouter } from "next/router";
import TableLoader from "../tableLoader";
import { fetchData } from "@/utils/fetchData";
import { useCustomClient } from "@/hooks/useCustomClient";
import { useTranslation } from "react-i18next";

export const AllUsers = () => {
  // Temel tablo değerleri
  const router = useRouter();
  const [take, setTake] = useState<number>(DEFAULT_TAKE);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<TableFilterInterface>({
    search: (router.query.search as string) || "",
  });
  const [order, setOrder] = useState<TableOrderInterface>({ id: "desc" });
  const [checkeds, setCheckeds] = useState<string[]>([]);
  const skip = (page - 1) * take;

  useEffect(() => {
    setFilter({ search: router.query.search as string });
  }, [router.query]);

  // Temel tablo değerleri
  const { t, i18n } = useTranslation(); //coklu dil destegi icin.

  dayjs.locale(i18n.language);
  dayjs.extend(localizedFormat);

  // Tablo sorgusu
  // const { data, loading, error, refetch } = useQuery(USERS, {
  //   fetchPolicy: "no-cache",
  //   variables: {
  //     take: take > 0 ? take : DEFAULT_TAKE,
  //     skip: skip > 0 ? skip : 0,
  //     order: order,
  //     filter: filter,
  //   },
  // });

  // console.log(data);

  //-------
  //DELETE
  //--------
  /**
   * Kullanıcıları silme sorgusu
   */

  // const deleteUserMutation = gql`
  //   mutation DeleteUsers($uuid: [String!]) {
  //     deleteUsers(uuid: $uuid)
  //   }
  // `;

  const { data, error, loading } = useCustomClient({
    query: USERS,
    variables: {
      take: take > 0 ? take : DEFAULT_TAKE,
      skip: skip > 0 ? skip : 0,
      order: order,
      filter: filter,
    },
  });

  // const [runDeleteUserMutation, deleteUsersMutation] = useMutation(
  //   deleteUserMutation,
  //   {
  //     onCompleted: (data: any) => {
  //       // console.log("deleted: ", data);
  //       handleAllRowCheck(false, null);
  //       refetch();
  //     },
  //     onError: (error: any) => {
  //       // console.error("error on while delete user: ", error);
  //     },
  //   }
  // );

  const deleteItems = (checkeds: string[]) => {
    // alert(checkeds);
    openConfirmModal({
      title: t("operation.delete.askMessage"),
      labels: {
        confirm: t("operation.delete.delete"),
        cancel: t("operation.delete.cancel"),
      },
      cancelProps: { size: "xs" },
      onCancel: () => {
        //alert("canceled");
      },
      confirmProps: { size: "xs" },
      onConfirm: () => {
        // runDeleteUserMutation({
        //   variables: {
        //     uuid: checkeds,
        //   },
        // });
      },
    });
  };

  // ------------------------------------------------------------------------------------------------------------------
  // SÜTUN VE SATIRLAR
  // ------------------------------------------------------------------------------------------------------------------

  /**
   * Tablo sütunları
   */
  const [columns, setColumns] = useState<LayoutColTypes[]>([
    {
      field: "check",
      visible: true,
      label: (
        <Checkbox
          size="xs"
          onChange={(e) => handleAllRowCheck(e.target.checked, null)}
        />
      ),
      style: { width: 50, textAlign: "center" },
    },
    {
      field: "id",
      visible: true,
      label: (
        <TableColumnLabel
          label="ID"
          field="id"
          order={order}
          setOrder={setOrder}
        />
      ),
      style: { width: 80 },
    },
    {
      field: "uuid",
      visible: false,
      label: (
        <TableColumnLabel
          label="UUID"
          field="uuid"
          order={order}
          setOrder={setOrder}
        />
      ),
      style: { width: 80 },
    },
    {
      field: "imageUrl",
      visible: true,
      label: (
        <TableColumnLabel
          label={t("AllUsers.imgUrl")}
          field="imageUrl"
          order={order}
          setOrder={setOrder}
        />
      ),
      style: { width: 80 },
    },
    {
      field: "firstName",
      visible: true,
      label: (
        <TableColumnLabel
          label={t("AllUsers.firstName")}
          field="firstName"
          order={order}
          setOrder={setOrder}
        />
      ),
      style: { width: 250 },
    },
    {
      field: "lastName",
      visible: true,
      label: (
        <TableColumnLabel
          label={t("AllUsers.lastName")}
          field="lastName"
          order={order}
          setOrder={setOrder}
        />
      ),
      style: { width: 250 },
    },
    {
      field: "email",
      visible: true,
      label: (
        <TableColumnLabel
          label={t("AllUsers.email")}
          field="email"
          order={order}
          setOrder={setOrder}
        />
      ),
      style: { width: 80 },
    },
    {
      field: "createdAt",
      visible: false,
      label: (
        <TableColumnLabel
          label={t("AllUsers.createdAt")}
          field="createdAt"
          order={order}
          setOrder={setOrder}
        />
      ),
      style: { width: 80 },
    },
    {
      field: "updatedAt",
      visible: false,
      label: (
        <TableColumnLabel
          label={t("AllUsers.updatedAt")}
          field="updatedAt"
          order={order}
          setOrder={setOrder}
        />
      ),
      style: { width: 80 },
    },
    {
      field: "operation",
      visible: true,
      label: <Title order={6}>{t("AllUsers.operation")}</Title>,
      style: { width: 250 },
    },
  ]);

  /**
   * Veriyi tabloda gösterilecek hale getir
   */
  const rows = data?.users?.items.map((item: AllUsersType) => {
    const rowChecked = checkeds?.indexOf(item?.uuid) >= 0 ? true : false;
    const avatarUserLatters = `${item.firstName.slice(
      0,
      1
    )}${item.lastName.slice(0, 1)}`;

    return {
      cells: {
        check: {
          content: (
            <Checkbox
              size="xs"
              onChange={() => handleRowCheck(item?.uuid)}
              checked={rowChecked}
            />
          ),
          style: { textAlign: "center" },
        },
        id: {
          content: `${item.id}`,
          style: { textAlign: "" },
        },
        uuid: {
          content: <span style={{ fontFamily: "monospace" }}>{item.uuid}</span>,
          style: { textAlign: "center" },
        },
        imageUrl: {
          // content: <span style={{ fontFamily: "monospace" }}>{item.user.imageUrl}</span>,
          content: (
            <>
              {item?.imageUrl ? (
                <Center className="user_avatar" style={{ width: "100%" }}>
                  <Avatar src={item?.imageUrl} alt="User Img" color="red" />
                  <Center className="user_info">
                    <Text>{item.firstName}</Text>
                    <Text>{item.lastName}</Text>
                  </Center>
                </Center>
              ) : (
                <Center className="user_avatar" style={{ width: "100%" }}>
                  <Avatar color="red">{avatarUserLatters}</Avatar>
                  <Center className="user_info">
                    <Text>{item.firstName}</Text>
                    <Text>{item.lastName}</Text>
                  </Center>
                </Center>
              )}
            </>
          ),
          style: { textAlign: "center" },
        },
        firstName: {
          content: (
            <span style={{ fontFamily: "monospace" }}>{item.firstName}</span>
          ),
          style: { textAlign: "center" },
        },
        lastName: {
          content: (
            <span style={{ fontFamily: "monospace" }}>{item.lastName}</span>
          ),
          style: { textAlign: "center" },
        },

        email: {
          content: (
            <span style={{ fontFamily: "monospace" }}>{item.email}</span>
          ),
          style: { textAlign: "center" },
        },
        createdAt: {
          content: (
            <span style={{ fontFamily: "monospace" }}>
              {dayjs(item.createdAt).locale(i18n.language).format("lll")}
            </span>
          ),
          style: { textAlign: "center" },
        },
        updatedAt: {
          content: (
            <span style={{ fontFamily: "monospace" }}>
              {dayjs(item.updatedAt).locale(i18n.language).format("lll")}
            </span>
          ),
          style: { textAlign: "center" },
        },
        operation: {
          content: (
            <div className="table_action">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Group>
                  <Link href={`/users/edit/${item.uuid}`} passHref>
                    <ActionIcon>
                      <MdEdit size={16} />
                    </ActionIcon>
                  </Link>
                  <ActionIcon onClick={() => deleteItems([item.uuid])}>
                    <MdDelete size={16} />
                  </ActionIcon>
                </Group>
              </div>
            </div>
          ),
          style: { textAlign: "center" },
        },
      },
    };
  });

  useEffect(() => {
    columns.splice(0, 1, {
      ...columns[0],
      label: (
        <Checkbox
          size="xs"
          onChange={(e) => handleAllRowCheck(e.target.checked, rows)}
          checked={equalsCheck(
            checkeds,
            rows?.map((item: any) => {
              return item?.cells.uuid.content.props.children;
            })
          )}
        />
      ),
    });
  }, [data]);

  useEffect(
    () =>
      setColumns((columns) => [
        {
          ...columns[0],
          label: (
            <Checkbox
              size="xs"
              onChange={(e) => handleAllRowCheck(e.target.checked, rows)}
              checked={equalsCheck(
                checkeds,
                rows?.map((item: any) => {
                  return item?.cells.uuid.content.props.children;
                })
              )}
            />
          ),
        },
        {
          ...columns[1],
          label: (
            <TableColumnLabel
              label="ID"
              field="id"
              order={order}
              setOrder={setOrder}
            />
          ),
        },
        {
          ...columns[2],
        },
        {
          ...columns[3],
          label: (
            <TableColumnLabel label={t("AllUsers.imageUrl")} field="imageUrl" />
          ),
        },
        {
          ...columns[4],
          label: (
            <TableColumnLabel
              label={t("AllUsers.firstName")}
              field="firstName"
              order={order}
              setOrder={setOrder}
            />
          ),
        },
        {
          ...columns[5],
          label: (
            <TableColumnLabel
              label={t("AllUsers.lastName")}
              field="lastName"
              order={order}
              setOrder={setOrder}
            />
          ),
          style: { width: 250 },
        },
        {
          ...columns[6],
          label: (
            <TableColumnLabel
              label={t("AllUsers.email")}
              field="email"
              order={order}
              setOrder={setOrder}
            />
          ),
          style: { width: 250 },
        },
        {
          ...columns[7],
          label: (
            <TableColumnLabel
              label={t("AllUsers.createdAt")}
              field="createdAt"
              order={order}
              setOrder={setOrder}
            />
          ),
          style: { width: 250 },
        },
        {
          ...columns[8],
          label: (
            <TableColumnLabel
              label={t("AllUsers.updatedAt")}
              field="updatedAt"
              order={order}
              setOrder={setOrder}
            />
          ),
          style: { width: 250 },
        },
        {
          ...columns[9],
        },
      ]),
    [order, checkeds]
  );

  // ------------------------------------------------------------------------------------------------------------------
  // ARAÇLAR
  // ------------------------------------------------------------------------------------------------------------------

  const handleRowCheck = (uuid: string) => {
    const index = checkeds?.indexOf(uuid);

    // Zaten var ise seçilidir
    // Listeden çıkartalım
    if (index >= 0) {
      checkeds.splice(index, 1);
      setCheckeds([...checkeds]);

      // Seçili olmadığı için seçelim
    } else {
      setCheckeds([...checkeds, uuid]);
    }
  };

  const handleAllRowCheck = (checked: boolean, rows: any) => {
    if (checked) {
      const allCheckeds = rows?.map((item: any) => {
        return item?.cells.uuid.content.props.children;
      });
      setCheckeds(allCheckeds);
    } else {
      setCheckeds([]);
    }
  };

  // console.log("dddd", data);

  // ------------------------------------------------------------------------------------------------------------------
  // ŞABLON
  // ------------------------------------------------------------------------------------------------------------------

  return (
    <NewTableContext.Provider
      value={{
        columns,
        page,
        take,
        order,
        filter,
        checkeds,
        setColumns,
        setPage,
        setTake,
        setOrder,
        setFilter,
        setCheckeds,
        deleteItems: deleteItems,
        totalPages: data?.users?.pagination.totalPages,
        totalItems: data?.users?.pagination.totalItems,
      }}
    >
      <div className="table-wrapper">
        <div className="table-toolbar">
          <Toolbar />
        </div>
        <div className="table-content">
          <div style={{ position: "relative", height: "100%" }}>
            <TableLoader visible={loading} rowNumber={10} />
            {data && data.users?.items.length > 0 && (
              <Table
                columns={columns.filter((col) => col.visible)}
                rows={rows}
                take={take}
              />
            )}
            {data && data.users.items.length == 0 && (
              <TableAlert
                title={t("Alert.TableAlert.title")}
                message={t("Alert.TableAlert.message")}
                icon={<MdErrorOutline size={16} />}
                color="yellow"
              />
            )}
            {error && (
              <TableAlert
                title={t("Alert.TableAlert.error")}
                message={error}
                icon={<MdErrorOutline size={16} />}
                color="red"
              />
            )}
          </div>
        </div>
      </div>
    </NewTableContext.Provider>
  );
};
