import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";

import { styled } from "@mui/material";

function SectionText(props) {
  const NameTypography = styled(Typography)({
    fontWeight: "500",
    color: "#66B2FF",
  });

  const QuestionTypography = styled(Typography)({
    fontWeight: "700",
    color: "#001E3C",
  });

  const DescTypography = styled(Typography)({
    color: "#656464",
  });

  return (
    <Grid>
      <Grid item textAlign="left">
        <NameTypography variant="p">{props.sectionName}</NameTypography>
        <QuestionTypography variant="h5">{props.question}</QuestionTypography>
        <DescTypography variant="p">{props.description}</DescTypography>
      </Grid>
    </Grid>
  );
}

export default SectionText;
