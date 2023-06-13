import React from "react";
import { Box, Typography } from "@mui/material";
import { SectionHeading } from "../../../components/elements/sectionHeading/SectionHeading";

const PredictionResult = ({ spec, result }) => {
  return (
    <Box mt={6} alignItems={"center"}>
      <div
        style={{
          maxWidth: "100%",
          borderBottom: "1px solid #AFD8FF",
          marginBottom: "1.5rem",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      />
      <SectionHeading title="Prediction Result" align="left" underline="True" />
      <>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#217BF4",
          }}
        >
          Results
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "400",
            color: "#000",
          }}
        >
          {spec}: {result}
        </Typography>
      </>
    </Box>
  );
};

export default PredictionResult;
