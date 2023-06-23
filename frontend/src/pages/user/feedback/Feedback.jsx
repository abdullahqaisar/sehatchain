import * as React from "react";

import { Box, Grid } from "@mui/material";
import { SectionHeading } from "../../../components/elements/sectionHeading/SectionHeading";
import FeedbackForm from "./FeedbackForm";

const Feedback = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 6, md: 6 },
        px: { xs: 3, sm: 3, md: 6 },
      }}
    >
      <SectionHeading title="Your Feedback" align="left" underline="True" />
      <Grid
        item
        xs={2}
        sm={2}
        md={4}
        sx={{
          px: { xs: 1, sm: 4, md: 14, lg: 20 },
        }}
      >
        <FeedbackForm />
      </Grid>
    </Box>
  );
};

export default Feedback;
