import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { TextField } from "formik-material-ui";
import { InputLabel } from "@material-ui/core";
function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Field id={name} name={name} component={TextField} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;
