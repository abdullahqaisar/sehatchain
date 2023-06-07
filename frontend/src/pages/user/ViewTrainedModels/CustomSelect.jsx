import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CustomSelect = ({ label, value, onChange, options }) => {
  return (
    <FormControl sx={{ mt: 2, minWidth: 250, mx: 2 }}>
      <InputLabel id="custom-select-label">{label}</InputLabel>
      <Select
        labelId="custom-select-label"
        variant="standard"
        value={value}
        onChange={onChange}
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
