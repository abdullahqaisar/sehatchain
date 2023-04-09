import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({
  label,
  type,
  InputLabelProps,
  inputProps,
  value,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      InputLabelProps={InputLabelProps}
      inputProps={inputProps}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomTextField;
