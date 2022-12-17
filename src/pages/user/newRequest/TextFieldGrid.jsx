import { Grid } from "@mui/material";

import CustomTextField from "../../../components/elements/customTextField/CustomTextField";

function TextFieldGrid(props) {
  return (
    <Grid item xs={12} md={3.5} m={1}>
      <CustomTextField label={props.label} />
    </Grid>
  );
}

export default TextFieldGrid;
