export interface Entry {
  id: number;
  uuid: string;
}

export interface EntryContent {
  name: string;
  value: any;
}

export interface EntryInputValues {
  title: string;
  description: string;
}

export interface EntryFormProps {
  values: any;
  type: any;
  uuid?: string;
  data?: any;
  refetch?: (
    variables?:
      | Partial<{
          uuid: string | string[] | undefined;
        }>
      | undefined
  ) => Promise<ApolloQueryResult<any>>;
  formType?: "edit" | "create";
  layout: FormLayout;
  yupSchema: any;
  onSubmit: (values: any) => void;
}
