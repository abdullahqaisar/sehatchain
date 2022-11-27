import React from "react";
import { Box, Typography, Grid } from "@mui/material";
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
      <Grid item textAlign={props.align} md={10}>
          <NameTypography variant="h6" marginBottom={2}>
            {props.sectionName}
          </NameTypography>
          <QuestionTypography variant="h4" marginBottom={2}>
            {props.question}
          </QuestionTypography>
          <DescTypography variant="p" marginBottom={2}>
            {props.description}
          </DescTypography>
      </Grid>
    </Grid>
  );
}

export default SectionText;
