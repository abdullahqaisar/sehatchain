import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SectionHeading } from "../components/sectionHeading/SectionHeading";

import PastRequests from "../components/requestList/PastRequests";

const ViewTrainedModels = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Completed Requests" align="center" />
      <Typography
        variant="p"
        sx={{
          color: "#656464",
        }}
      >
        All your completed model requests can be found here
      </Typography>
      <PastRequests />
    </Box>
  );
};

export default ViewTrainedModels;
