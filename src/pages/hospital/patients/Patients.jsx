import * as React from "react";

import { Box, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import PastRequests from "../../user/components/requestList/PastRequests";
import { CustomIconButton } from "../../user/components/CustomIconButton/CustomIconButton";
import { SectionHeading } from "../../user/components/sectionHeading/SectionHeading";

const Patients = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Patients" align="center" />
      <Grid
        container
        justifyContent="center"
        sx={{
          pb: 6,
        }}
      >
        <Grid item md={6} xs={12}>
          <CustomIconButton
            Icon={AddCircleIcon}
            text="Add Patient"
            bgColor="#DBEAFF"
            ml={6}
            href="../newpatient"
          />
        </Grid>
      </Grid>
      <PastRequests />
    </Box>
  );
};

export default Patients;
