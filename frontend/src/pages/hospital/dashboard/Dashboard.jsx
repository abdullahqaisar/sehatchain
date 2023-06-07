import * as React from "react";

import { Box, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { CustomIconButton } from "../../user/components/CustomIconButton/CustomIconButton";
import { SectionHeading } from "../../user/components/sectionHeading/SectionHeading";
import { AllRequests } from "./AllRequests";

const Dashboard = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Welcome Back" align="left" />
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
            text="Patients"
            bgColor="#EAEAEA"
            mr={6}
            href="../patients/add"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <CustomIconButton
            Icon={CheckCircleIcon}
            text="Manage Requests"
            bgColor="#DBEAFF"
            ml={6}
            href="../requests"
          />
        </Grid>
      </Grid>
      <AllRequests />
    </Box>
  );
};

export default Dashboard;
