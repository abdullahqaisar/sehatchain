import { TextField } from "@mui/material";

function CustomTextField(props) {
  return (
    <TextField
      label={props.label}
      variant="outlined"
      color="primary"
      fullWidth
      InputProps={{
        disableUnderline: true,
      }}
      sx={{
        borderRadius: 1,
        backgroundColor: "#DBEAFF",
      }}
    />
  );
}

export default CustomTextField;
