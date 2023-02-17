import { createElement, FC, PropsWithChildren, ReactElement } from "react";
import { Alert, Button, ListGroup, Stack } from "react-bootstrap";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { v4 as uuidV4 } from "uuid";

import { When } from "@components/When";
import { Section } from "@components/Section";

import { AddableListProps } from "./AddableList.props";
import { deepMapOverChildren } from "@common/utils/deepMapOverChildren";
import { find } from "lodash";

export const AddableList = <T extends FormikValues>({
  list = [],
  label,
  render: RendererComponent,
  onChange,
  children,
  isSetId
}: PropsWithChildren<AddableListProps<T>>): ReturnType<FC> => {
  const validChildren: ReactElement[] = [];
  deepMapOverChildren(children, child => {
    if (child.props.id) validChildren.push(child);
  });

  const { schema, initialValues } = validChildren
    .map(child => {
      if (child && typeof child === "object" && "props" in child) {
        return {
          schema: { [child.props.id]: child.props.schema } as T,
          initialValues: { [child.props.id]: child.props.defaultValue || "" } as T
        };
      }
    })
    .filter((child): child is { schema: T; initialValues: T } => !!child)
    .reduce((acc, curr) => ({ ...acc, ...curr }), {} as { schema: T; initialValues: T });

  const form = useFormik({
    initialValues: isSetId ? { ...initialValues, id: uuidV4() } : initialValues,
    validationSchema: yup.object().shape(schema),
    onSubmit(values) {
      if (find(list, values)) return;
      onChange?.([...list, values]);
    }
  });

  const childrenWithProps = deepMapOverChildren(children, child => {
    const props = { ...child.props };
    if (props.id) {
      Object.assign(props, form.getFieldProps(props.id));
    }

    return createElement(child.type, props);
  });

  return (
    <Section label={label}>
      <Stack gap={2}>
        <When condition={list.length > 0}>
          <ListGroup>
            {list.map((listItem, index) => (
              <ListGroup.Item color="black" key={index}>
                <RendererComponent item={listItem} index={index} />
              </ListGroup.Item>
            ))}
          </ListGroup>

          <hr className="my-1 border-white" />
        </When>

        <When condition={Object.keys(form.errors).length > 0}>
          <Alert variant="danger">
            {Object.entries(form.errors).map(([key, value]) => (
              <div key={key}>{value}</div>
            ))}
          </Alert>
        </When>

        {childrenWithProps}

        <Button variant="primary" onClick={form.submitForm}>
          Add
        </Button>
      </Stack>
    </Section>
  );
};
