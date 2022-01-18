import React from "react";
// import Input from "./Input";
import Select from "./Select";
import RadioButtons from "./RadioButtons";
import TicketButtons from "./TicketButtons";

// import CheckboxGroup from "./CheckboxGroup";

function FormikControl(props) {
  const { blockSubmit, control, ...rest } = props;

  switch (control) {
    // case "input":
    //   return <Input {...rest} />;
    case "select":
      return <Select blockSubmit={blockSubmit} {...props} {...rest} />;
    case "radio":
      return <RadioButtons blockSubmit={blockSubmit} {...props} {...rest} />;
    case "ticket":
      return <TicketButtons blockSubmit={blockSubmit} {...props} {...rest} />;
    // case "checkbox":
    //   return <CheckboxGroup {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
