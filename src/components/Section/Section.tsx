import { FC, PropsWithChildren } from "react";
import { Container, Form } from "react-bootstrap";
import classNames from "classnames";

import { When } from "@components/When";
import { SectionProps } from "@components/Section/Section.props";

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  label,
  as = "h5",
  className,
  children
}) => {
  return (
    <Container
      fluid
      className={classNames(
        { "my-3": !!label, "my-1": !label, "p-2": !!label },
        "bg-secondary border-1 rounded",
        className
      )}
    >
      <When condition={!!label}>
        <Form.Label as={as} className="text-white">
          {label}:
        </Form.Label>
      </When>

      {children}
    </Container>
  );
};
