import * as React from "react";

import { Box, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";

import goalImage from "../../assets/images/goal.png";

import SectionText from "./SectionText";

const AboutUs = () => {
  return (
    <Box
      id="our-goal"
      sx={{
        pt: 6,
        pb: { xs: 12, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
    >
      <Container maxWidth={false}>
        <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
          <Grid item md={6}>
            <Grid sm={12} md={10}>
              <SectionText
                sectionName="Our Goal"
                question="Why are we here?"
                description="We aim at making a tool which can make it easier for researchers 
                    and healthcare professionals to find trained models for their tasks using 
                    the most emerging technology like blockchain"
                align="left"
              />
            </Grid>
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
