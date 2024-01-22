"use client";

import {
  Group,
  ActionIcon,
  Drawer,
  Indicator,
  Button,
  Menu,
  Modal,
  Stack,
} from "@mantine/core";
import { useContext, useState } from "react";
import {
  MdSettings,
  MdFilterAlt,
  MdAdd,
  MdDelete,
  MdExpandMore,
  MdTableView,
} from "react-icons/md";
import { TableCompactPager } from "./TableCompactPager";
import {
  NewTableContext,
  TableContextInterface,
} from "../../contexts/TableContext";
import { FiltersDrawer } from "./filtersDrawer";
import { SettingsDrawer } from "./settingsDrawer";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface Props {
  createPath: string;
}

export const Toolbar: React.FC<Props> = ({ createPath }) => {
  const { t } = useTranslation();
  const { filter, checkeds, deleteItems } = useContext(
    NewTableContext
  ) as TableContextInterface;
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [filtersOpened, setFiltersOpened] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  return (
    <>
      {/* Toolbar */}
      <Group>
        <Group>
          <ActionIcon
            color={"green"}
            variant="filled"
            onClick={() => router.push(createPath)}
          >
            <MdAdd />
          </ActionIcon>

          <ActionIcon
            color={"green"}
            variant="filled"
            onClick={() => setModalOpen(true)}
          >
            <MdTableView />
          </ActionIcon>

          <Menu position="bottom-start">
            <Menu.Target>
              <Button
                size="xs"
                rightSection={<MdExpandMore />}
                variant={"default"}
              >
                {t("toolbar.selected")}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => deleteItems && deleteItems(checkeds)}>
                {t("operation.delete.delete")}
              </Menu.Item>
              <Menu.Item onClick={() => alert("not implemented")}>
                {t("operation.delete.cancel")}
              </Menu.Item>
              {/* <Menu.Item onClick={() => alert("not implemented")}>Yayından Kaldır</Menu.Item> */}
            </Menu.Dropdown>
          </Menu>

          {checkeds?.length > 0 && (
            <>
              <ActionIcon
                variant="default"
                right={"asd"}
                onClick={() => deleteItems && deleteItems(checkeds)}
              >
                <MdDelete />
              </ActionIcon>
            </>
          )}
        </Group>
        <div></div>
        <Group>
          <TableCompactPager />
          <ActionIcon
            onClick={() => setSettingsOpened(true)}
            variant={"default"}
          >
            <MdSettings />
          </ActionIcon>
          <Indicator processing disabled={filter.search ? false : true}>
            <ActionIcon
              onClick={() => setFiltersOpened(true)}
              variant={"default"}
            >
              <MdFilterAlt />
            </ActionIcon>
          </Indicator>
        </Group>
      </Group>

      {/* Çekmeceler */}
      <Drawer
        opened={settingsOpened}
        onClose={() => setSettingsOpened(false)}
        title={t("Settings.Settings")}
        padding="xl"
        size="xl"
        position="right"
        // overlayOpacity={0.1}
        zIndex={100}
      >
        <SettingsDrawer />
      </Drawer>

      <Drawer
        opened={filtersOpened}
        onClose={() => setFiltersOpened(false)}
        title={t("Filter.title")}
        padding="xl"
        size="xl"
        position="right"
        // overlayOpacity={0.1}
        zIndex={100}
      >
        <FiltersDrawer />
      </Drawer>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="UserTable"
        size={"xl"}
      >
        <Stack>
          <Group>
            <Button>{t("Setting.settingGroup.apply")}</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
