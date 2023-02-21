import { Schema } from "yup";

export interface FormElement {
  name?: string;
  label?: string;
  schema?: Schema;
}
