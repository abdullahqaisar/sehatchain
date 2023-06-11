import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CustomSelect = ({ label, value, onChange, options }) => {
  return (
    <FormControl sx={{ mt: 2, mx: 6 }}>
      <InputLabel
        id={`${label}-select-label`}
        shrink={true}
        sx={{ display: "block" }}
      >
        {label}
      </InputLabel>
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
        }}
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
