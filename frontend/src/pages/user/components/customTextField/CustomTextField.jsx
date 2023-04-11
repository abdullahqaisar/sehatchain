import React from "react";
import { Grid, TextField } from "@mui/material";

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
      sx={{ mt: 2, minWidth: 250, mx: 2 }}
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
