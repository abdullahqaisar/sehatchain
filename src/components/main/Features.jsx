import * as React from "react";

import { Box, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";

import SectionText from "./SectionText";

import { data } from "./Features.data";

const Features = () => {
  return (
    <Box
      id="features"
      sx={{
        pt: 6,
        pb: { xs: 12, md: 6 },
      }}
      align="center"
      style={{
        background:
          "linear-gradient(0deg, rgba(241, 246, 253, 0) 1.63%, #F1F6FD 20.5%, #F1F6FD 58.57%, #FFFFFF 100%)",
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          align="center"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item md={12}>
            <Grid sm={12} md={6}>
              <SectionText
                sectionName="Features"
                question="Why use SehatChain?"
                description="SehatChain uses the most cutting edge technologies and the best techniques to train models and share those models with you maintaing privacy."
                align="center"
              />
            </Grid>
          </Grid>
          <Grid container md={12} lg={10} align="center" alignItems="center">
            {data.map(({ title, description, icon }, index) => (
              <Grid key={String(index)} item xs={12} md={6} align="left">
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    m: 2,
                    px: 2,
                    py: 1.5,
                    boxShadow: 0,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      mx: 3,
                      my: 5,
                      backgroundColor: "#217BF4",
                      borderRadius: "20%",
                      height: 80,
                      width: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "primary.contrastText",
                      "& svg": {
                        fontSize: 40,
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box
                    sx={{ display: "flex", flex: 1, flexDirection: "column" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mb: 1, color: "#001E3C", fontWeight: "600" }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      sx={{ lineHeight: 1.3, color: "text.secondary" }}
                      variant="subtitle1"
                    >
                      {description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
