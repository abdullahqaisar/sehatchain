import { Box, Grid } from "@mui/material";
import { SectionHeading } from "../../../components/elements/sectionHeading/SectionHeading";

import NewPatientForm from "./NewPatientForm";

const NewPatient = () => {
  return (
    <Box
      sx={{
        pt: 6,
        px: 6,
        pb: 4,
      }}
    >
      <SectionHeading title="Add Patients Data" align="left" underline="True" />
      <Grid
        item
        xs={6}
        sm={6}
        md={4}
        sx={{
          px: { xs: 3, sm: 4, md: 14, lg: 20 },
        }}
      >
        <NewPatientForm />
      </Grid>
    </Box>
  );
};

export default NewPatient;
