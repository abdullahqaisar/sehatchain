import React from "react";
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const CustomMultiSelect = ({ label, value, onChange, options, disabled }) => {
  return (
    <FormControl sx={{ mt: 2 }}>
      <label htmlFor={`${label}-select`}>
        <Typography
          sx={{ fontSize: 15, textAlign: "left", mb: 1 }}
          color="#071B2F"
        >
          {label}
        </Typography>
      </label>
      <Select
        labelId={`${label}-select`}
        id={`${label}-select`}
        multiple
        value={value}
        onChange={onChange}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <Chip
                key={value}
                label={options.find((option) => option.value === value).label}
                onDelete={(event) => {
                  event.stopPropagation();
                  onChange({
                    target: { value: selected.filter((v) => v !== value) },
                  });
                }}
              />
            ))}
          </div>
        )}
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

export default CustomMultiSelect;
