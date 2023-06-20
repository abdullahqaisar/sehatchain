import React from "react";
import { TextField, Typography, Box } from "@mui/material";

const CustomTextField = ({
  label,
  type,
  InputLabelProps,
  inputProps,
  value,
  onChange,
}) => {
  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <label htmlFor={`${label}-select`}>
        <Typography
          sx={{ fontSize: 15, textAlign: "left", my: 1 }}
          color="#071B2F"
        >
          {label}
        </Typography>
      </label>
      <TextField
        sx={{
          width: "100%",
          background: "#F5FAFF",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#98CDFF",
          },
        }}
        type={type}
        InputLabelProps={InputLabelProps}
        inputProps={inputProps}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};

export default CustomTextField;
