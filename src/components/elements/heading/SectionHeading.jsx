import * as React from "react";

import { Typography } from "@mui/material";

const SectionHeading = (props) => {
  return (
    <Typography
      component="h2"
      sx={{
        textAlign: "left",
        fontSize: { xs: 20, md: 30 },
        fontWeight: "700",
        color: "#001E3C",
        mb: 3,
      }}
    >
      {props.title}
    </Typography>
  );
};

export default SectionHeading;
