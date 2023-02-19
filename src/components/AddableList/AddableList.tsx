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
import { ActionFormSchemaAndInitialValues } from "@components/ActionForm/ActionForm.props";

export const AddableList = <T extends FormikValues>({
  list = [],
  label,
  render: RendererComponent,
  onChange,
  children,
  isSetId,
  btnLabel
}: PropsWithChildren<AddableListProps<T>>): ReturnType<FC> => {
  const validChildren: ReactElement[] = [];
  deepMapOverChildren(children, child => {
    if (child.props.id) validChildren.push(child);
  });

  const { schema, initialValues } = validChildren
    .map(child => {
      if (child && typeof child === "object" && "props" in child) {
        return {
          schema: { [child.props.id]: child.props.schema },
          initialValues: { [child.props.id]: child.props.defaultValue || "" }
        } as ActionFormSchemaAndInitialValues<T>;
      }
    })
    .filter((item): item is ActionFormSchemaAndInitialValues<T> => !!item)
    .reduce((acc, curr) => ({ ...acc, ...curr }), {} as ActionFormSchemaAndInitialValues<T>);

  const form = useFormik({
    initialValues,
    validationSchema: yup.object().shape(schema),
    onSubmit(values) {
      if (find(list, values)) return;
      if (isSetId) {
        // @ts-ignore
        values.id = uuidV4();
      }
      onChange?.([...list, values]);
      form.resetForm();
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

        <When condition={Object.keys(form.errors).length > 0 && form.submitCount > 0}>
          <Alert variant="danger">
            {Object.entries(form.errors).map(([key, value]) => (
              <div key={key}>{value}</div>
            ))}
          </Alert>
        </When>

        {childrenWithProps}

        <Button variant="primary" onClick={form.submitForm}>
          {btnLabel || "Add"}
        </Button>
      </Stack>
    </Section>
  );
};
