import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";

interface Props {
  name: string;
  placeholder: string;
  label?: string;
  rows: number;
  className?: any;
  cols?: number;
}

export default function MyTextArea(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea className={props.className} {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color={"red"}>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
