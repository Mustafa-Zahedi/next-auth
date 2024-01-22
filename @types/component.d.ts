export interface ComponentTypes {
  id: number;
  uuid: string;
  name: string;
  description: string;
  // properties?: string;
  width: number;
  height: number;
  margin: number;
  data_table: string;
  data_table_row: {
    row: string;
  }[];
  padding: number;
  createdAt: string;
  updatedAt: string;
}
