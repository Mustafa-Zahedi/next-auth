export interface TableProps {
  columns: TableColumn[];
  rows: TableRow[];
  take: number;
  hasHeader?: boolean;
  handleDragEnd?: (event: any) => void;
  activeId?: number | string | null;
  setActiveId?: (value: SetStateAction<null>) => void;
}
