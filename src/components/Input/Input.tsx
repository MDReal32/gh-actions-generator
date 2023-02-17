import { FC } from "react";
import { Form } from "react-bootstrap";

import { InputProps } from "./Input.props";
import { Section } from "@components/Section";

export const Input: FC<InputProps> = ({ id, label, className, ...props }) => {
  return (
    <Section label={label}>
      <Form.Control id={id} {...props} className={className} />
    </Section>
  );
};
