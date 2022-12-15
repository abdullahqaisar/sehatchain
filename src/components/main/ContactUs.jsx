import * as React from "react";

import InputBase from "@mui/material/InputBase";

import { Box, Grid, Typography, TextField } from "@mui/material";
import { Container } from "@mui/system";

import { CustomButton } from "../elements/customButton";
import SectionText from "./SectionText";

const AboutUs = () => {
  return (
    <Box
      id="contact-us"
      sx={{
        pt: 6,
        pb: { xs: 12, md: 6 },
        px: { xs: 3, sm: 6, md: 6 },
      }}
      style={{background: 'linear-gradient(0deg, rgba(241, 246, 253, 0) 1.63%, #F1F6FD 20.5%, #F1F6FD 58.57%, #FFFFFF 100%)'}}
      
    >
      <Container maxWidth={false}>
        <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
          <Grid item md={6}>
            <Grid sm={12} md={10} align="left" pb={4}>
              <SectionText
                sectionName="Contact Us"
                question="Need to get in touch with us?"
                description="Need to get in touch with us? Fill out the form and we will be in touch with you within 24 hours or mail us the queries on"
                align="left"
              />
              <Typography variant="p" color="#217BF4">
                info@sehatchain.com
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            md={6}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Grid md={8}>
              <TextField
                label="Name"
                defaultValue=""
                sx={{
                  width: "100%",
                  mr: { xs: 0, md: 3 },
                  mb: { xs: 2, md: 2 },
                }}
              />
              <TextField
                label="Email"
                email
                defaultValue=""
                sx={{
                  width: "100%",
                  mr: { xs: 0, md: 3 },
                  mb: { xs: 2, md: 2 },
                }}
              />
              <TextField
                label="Your Question"
                multiline
                rows={4}
                defaultValue=""
                sx={{
                  width: "100%",
                  mr: { xs: 0, md: 3 },
                  mb: { xs: 2, md: 2 },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <CustomButton
                  backgroundColor="#217BF4"
                  color="#fff"
                  buttonText="Submit"
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
