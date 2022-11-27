import React from "react";
import { Typography, Grid } from "@mui/material";
import { styled } from "@mui/material";

function SectionText(props) {
  const NameTypography = styled(Typography)({
    fontWeight: "600",
    color: "#217BF4",
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
      <Grid item textAlign={props.align}>
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
