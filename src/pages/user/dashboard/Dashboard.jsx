import * as React from "react";

import { Box, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import PastRequests from "./PastRequests";
import { CustomIconButton } from "../components/CustomIconButton/CustomIconButton";
import { SectionHeading } from "../components/sectionHeading/SectionHeading";

const Dashboard = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 12, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Welcome Back" align="left" />
      <Grid
        container
        justifyContent="center"
        sx={{
          pb: { xs: 12, md: 6 },
        }}
      >
        <Grid item md={6} xs={12}>
          <CustomIconButton
            Icon={AddCircleIcon}
            text="Request New Model"
            bgColor="#EAEAEA"
            mr={6}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <CustomIconButton
            Icon={CheckCircleIcon}
            text="Completed Requests"
            bgColor="#DBEAFF"
            ml={6}
            href="/sehatchain/login"
          />
        </Grid>
      </Grid>
      <PastRequests />
    </Box>
  );
};

export default Dashboard;
