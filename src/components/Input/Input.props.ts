import { FormControlProps } from "react-bootstrap";
import { Schema } from "yup";

export interface InputProps extends FormControlProps {
  id?: string;
  label?: string;
  className?: string;
  schema?: Schema;
}
