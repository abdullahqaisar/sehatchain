import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SectionHeading } from "../../user/components/sectionHeading/SectionHeading";

import { RequestTable } from "./RequestTable";

const Requests = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <SectionHeading title="Received Requests" align="center" />
      <Typography
        variant="p"
        sx={{
          color: "#656464",
        }}
      >
        Recent requests from users can be found here. You can accept or reject a
        request by opening a request.
      </Typography>
      <RequestTable />
    </Box>
  );
};

export default Requests;
