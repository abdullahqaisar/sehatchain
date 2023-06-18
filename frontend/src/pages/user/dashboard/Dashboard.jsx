import * as React from "react";

import { Box, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { AllRequests } from "./AllRequests";
import { CustomIconButtonLarge } from "../../../components/elements/customIconButtonLarge/CustomIconButtonLarge";
import { SectionHeading } from "../../../components/elements/sectionHeading/SectionHeading";

const Dashboard = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Get Started" align="left" underline="True" />
      <Grid
        container
        justifyContent="left"
        sx={{
          pb: 6,
        }}
      >
        <Grid item md={4} xs={12}>
          <CustomIconButtonLarge
            Icon={AddCircleIcon}
            text="New Request"
            bgColor="#DBEDFF"
            mr={6}
            href="../newrequest"
          />
        </Grid>
        {/* 
        <Grid item md={6} xs={12}>
          <CustomIconButton
            Icon={CheckCircleIcon}
            text="Received Models"
            bgColor="#DBEAFF"
            ml={6}
            href="../viewmodels"
          />
        </Grid> */}
      </Grid>
      <SectionHeading title="Your Requests" align="left" underline="True" />
      <AllRequests />
    </Box>
  );
};

export default Dashboard;
