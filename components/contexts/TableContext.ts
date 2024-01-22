import { createContext } from "react";
import {
  TableColumnInterface,
  TablePaginationInterface,
  TableRowInterace,
} from "../../hooks/useTable";

export interface TableContextType {
  columns: TableColumnInterface[];
  rows: TableRowInterace[] | null;
  checks: boolean;
  allChecked: boolean;
  order: any[];
  filters: any;
  settings: any;
  pagination: TablePaginationInterface | null;
  setColumns: (columns: TableColumnInterface[]) => void;
  setRows: (rows: TableRowInterace[]) => void;
  setOrder: (order: any[]) => void;
  setFilters: (filters: any) => void;
  setPagination: (pagination: TablePaginationInterface) => void;
  setSettings: (settings: any) => void;
  //setAllChecked: (e: any) => void;
}

export const TableContext = createContext<TableContextType>({
  columns: [],
  rows: [],
  checks: false,
  allChecked: false,
  order: [],
  filters: {},
  settings: {},
  pagination: null,
  setColumns: () => {},
  setRows: () => {},
  setOrder: () => {},
  setFilters: () => {},
  setPagination: () => {},
  setSettings: () => {},
  //setAllChecked: () => {},
});

export interface TableFilterInterface {
  search?: string;
  group?: string | string[] | undefined;
  name?: string;
  contains?: string;
  slug?: string;
  componentUuid?: string;
  parentId?: number | null;
  typeId?: number | null;
  report?: boolean | null;
}

export interface TableOrderInterface {
  [key: string]: "asc" | "desc";
}

export interface TableContextInterface {
  columns: any[];
  page: number;
  take: number;
  order: TableOrderInterface;
  filter: TableFilterInterface;
  checkeds: string[];
  setColumns?: (columns: any) => void;
  setPage: (page: number) => void;
  setTake: (take: number) => void;
  setOrder: (order: TableOrderInterface) => void;
  setFilter: (filter: TableFilterInterface) => void;
  setCheckeds: (checkeds: string[]) => void;
  deleteItems?: (checkeds: string[]) => void;
  handlePublish?: (checkeds: string[]) => void;
  handleUnPublish?: (checkeds: string[]) => void;
  handleApprove?: (checkeds: string[]) => void;
  handleReject?: (checkeds: string[]) => void;
  totalPages: number;
  totalItems: number;
}

export const NewTableContext = createContext<TableContextInterface | null>(
  null
);
