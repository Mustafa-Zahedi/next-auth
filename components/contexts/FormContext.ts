import { FormikProps, FormikValues as Values } from "formik";
import { createContext } from "react";

export interface FormContextType {
  form: FormikProps<Values> | null;
}

export const FormContext = createContext<FormContextType>({
  form: null,
});
