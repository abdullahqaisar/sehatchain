import { Box } from "@mui/system";
import { SectionHeading } from "../../../components/elements/sectionHeading/SectionHeading";

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
      <SectionHeading title="Training Requests" align="left" underline="True" />
      <RequestTable />
    </Box>
  );
};

export default Requests;
