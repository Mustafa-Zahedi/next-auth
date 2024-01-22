import { useState } from "react";

export interface TableColumnInterface {
  id: string;
  label: string;
  field: string;
  attrs: any;
  sortable: boolean;
  order: any;
  visible: boolean;
}

export interface TableRowInterace {
  rowUUID: any;
  columns: any;
  checked: boolean;
}

export interface TablePaginationInterface {
  take: number;
  skip: number;
  items: number;
  pages: number;
  page: number;
}

export interface TableParamsInterface {
  loading: boolean;
  name: string;
  columns: TableColumnInterface[];
  rows: TableRowInterace[];
  order: any[];
  filters: any;
  settings: any;
  checks: boolean;
  allChecked: boolean;
  pagination: TablePaginationInterface;
}

// export interface TableInterface {}

export const useTable = (params: TableParamsInterface) => {
  const [table, setTable] = useState(params);

  const handleChange = (params: TableParamsInterface) => {
    setTable(params);
  };

  return [table, handleChange] as const;
};
