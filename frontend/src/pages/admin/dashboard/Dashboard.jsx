import * as React from "react";

import { Box, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import PastRequests from "../../user/components/requestList/PastRequests";
import { CustomIconButton } from "../../user/components/CustomIconButton/CustomIconButton";
import { SectionHeading } from "../../user/components/sectionHeading/SectionHeading";
import { RequestTable } from "../requests/RequestTable";

const Dashboard = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Received Requests" align="center" />
      <RequestTable />
    </Box>
  );
};

export default Dashboard;
