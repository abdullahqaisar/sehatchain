import { Grid } from "@mui/material";

import CustomTextField from "../customTextField/CustomTextField";

const TextFieldGrid = ({ label, name, value, onChange }) => {
  return (
    <Grid item xs={12} md={3.5} m={1}>
      <CustomTextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Grid>
  );
};

export default TextFieldGrid;
