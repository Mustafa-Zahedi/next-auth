export interface BaseForm {
  id: number;
  uuid: string;
}

export interface BaseFormContent {
  name: string;
  value: string;
}

export interface BaseFormInputValues {
  title: string;
  description: string;
}

export interface BaseFormProps {
  values: any;
  type: any;
  layout: FormLayout;
  yupSchema: any;
  submitting?: boolean;
  onSubmit: (values: any) => void;
}
