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
import { TableCompactPager } from "@/components/baseComponents/tableComponents/TableCompactPager";
import {
  NewTableContext,
  TableContextInterface,
} from "@/components/contexts/TableContext";
import { FiltersDrawer } from "./filtersDrawer";
import { SettingsDrawer } from "./settingsDrawer";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export const Toolbar = () => {
  const {
    filter,
    checkeds,
    deleteItems,
    handlePublish: handlePublishedEntries,
  } = useContext(NewTableContext) as TableContextInterface;
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [filtersOpened, setFiltersOpened] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  // const { t } = useTranslation();

  return (
    <>
      {/* Toolbar */}
      <Group>
        <Group>
          <ActionIcon
            color={"green"}
            variant="filled"
            onClick={() => router.push("/users/create")}
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
                {/* Seçilileri */}
                {"Action.The_Selected"}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => deleteItems && deleteItems(checkeds)}>
                {"Action.Delete"}
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  handlePublishedEntries && handlePublishedEntries(checkeds)
                }
              >
                {"Action.Publish"}
              </Menu.Item>
              <Menu.Item onClick={() => alert("not implemented")}>
                {"Action.UnPublish"}
              </Menu.Item>
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
        title={"Settings.Settings"}
        padding="xl"
        size="xl"
        position="right"
        zIndex={100}
      >
        <SettingsDrawer />
      </Drawer>

      <Drawer
        opened={filtersOpened}
        onClose={() => setFiltersOpened(false)}
        title={"Filter.title"}
        padding="xl"
        size="xl"
        position="right"
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
            <Button>Uygula</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
