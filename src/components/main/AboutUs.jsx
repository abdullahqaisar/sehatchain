import * as React from "react";

import { Box, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";

import SectionText from "./SectionText";

const AboutUs = () => {
  return (
    <Box
      sx={{
        position: "relative",
        pt: 6,
        pb: { xs: 12, md: 8 },
        
      }}
    >
      <Container maxWidth="xl">
        <Grid container xs={12} md={6}>
          <Grid item>
            <SectionText
              sectionName="About Us"
              question="What is SehatChain?"
              description="An AI and Blockchain powered tool for researchers and healthcare professionals to buy pre-trained models of healthcare data."
            />
          </Grid>
          <Grid item>
            <SectionText
              sectionName="About Us"
              question="What is SehatChain?"
              description="An AI and Blockchain powered tool for researchers and healthcare professionals to buy pre-trained models of healthcare data."
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
