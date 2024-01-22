import { Alert } from "@mantine/core";
import { useTranslation } from "react-i18next";

export interface TableAlertProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  message: string;
}

export const TableAlert = (props: TableAlertProps) => {
  const { t } = useTranslation();
  return (
    <div style={{ margin: 16 }}>
      <Alert icon={props.icon} title={props.title} color={props.color}>
        {typeof props.message === "string" ? t(props.message) : props.message}
      </Alert>
    </div>
  );
};
