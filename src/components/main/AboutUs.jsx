import * as React from "react";

import { Box, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";

import goalImage from "../../assets/images/goal.png";

import SectionText from "./SectionText";

const AboutUs = () => {
  return (
    <Box
      sx={{
        pt: 6,
        pb: { xs: 12, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <Container maxWidth={false}>
        <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
          <Grid item md={6}>
            <SectionText
              sectionName="About Us"
              question="What is SehatChain?"
              description="An AI and Blockchain powered tool for researchers and healthcare professionals to buy pre-trained models of healthcare data."
              align="left"
            />
          </Grid>
          <Grid item md={6}>
            <Box>
              <img
                src={goalImage}
                alt="hero"
                style={{
                  maxWidth: "90%",
                  justifyContent: "center",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
