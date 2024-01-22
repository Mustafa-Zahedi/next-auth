import React from "react";

export interface TableColumn {
  field: string;
  label: string | React.ReactNode;
  width?: number;
  style?: any;
}
