import React from "react";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";

const CustomSelect = ({ label, value, onChange, options, disabled }) => {
  return (
    <FormControl sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
      <label htmlFor={`${label}-select`}>
        <Typography
          sx={{ fontSize: 15, textAlign: "left", my: 1 }}
          color="#071B2F"
        >
          {label}
        </Typography>
      </label>
      <Select
        labelId={`${label}-select`}
        id={`${label}-select`}
        value={value}
        onChange={onChange}
        sx={{
          bgcolor: "#F5FAFF",
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#98CDFF",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#98CDFF",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#98CDFF",
          },
          "&.Mui-disabled": {
            bgcolor: "#FAFAFA",
          },
          "& .MuiSelect-select": {
            textAlign: "left",
            textAlignLast: "left",
          },
        }}
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
