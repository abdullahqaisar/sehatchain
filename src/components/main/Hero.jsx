import * as React from "react";

import { Box, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";

import heroImage from "../../assets/images/hero.png";

const Hero = () => {
  return (
    <Box
      id="hero"
      sx={{
        backgroundColor: "#001E3C",
        pt: 6,
        pb: { xs: 12, md: 8 },
        px: { xs: 3, sm: 6, md: 6 },

      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={0}
          sx={{ flexDirection: { xs: "column", md: "unset" } }}
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  component="h3"
                  sx={{
                    position: "relative",
                    fontSize: { xs: 40, md: 45 },
                    letterSpacing: 0,
                    fontWeight: "bold",
                    lineHeight: 0,
                    color: "#fff",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      position: "relative",
                    }}
                  >
                    Buy customized models for your
                  </Typography>

                  <Typography
                    component="mark"
                    sx={{
                      position: "relative",
                      color: "#66B2FF",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      backgroundColor: "unset",
                    }}
                  >
                    {" "}
                    Research
                  </Typography>
                </Typography>
              </Box>
              <Box sx={{ mb: 4, width: { xs: "100%", md: "7" } }}>
                <Typography sx={{ color: "#9A9A9A", lineHeight: 1.6 }}>
                  {
                    "Get customized models according to the your needs, trained in realtime based on your request. Data will be shared using the best privacy preserving techniques."
                  }
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="center"
            item
            xs={12}
            md={6}
            lg={6}
          >
            <Box>
              <img
                src={heroImage}
                alt="hero"
                style={{
                  maxWidth: "100%",
                  justifyContent: "center",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    // <Box sx={{ backgroundColor: "#001E3C", minHeight: "100vh" }}>
    //   <Navbar />
    //   <CustomBox>
    //     <Box
    //       sx={{
    //         flex: "1",
    //         alignItems: "center",
    //         textAlign: "left",
    //         justifyContent: "center",
    //         m: "0 2rem",
    //       }}
    //     >
    //       <Typography variant="h2" sx={{ color: "#fff", fontWeight: "700" }}>
    //         Buy customized models for your
    //       </Typography>
    //       <Typography variant="h2" sx={{ color: "#66B2FF", fontWeight: "700" }}>
    //         Research
    //       </Typography>
    //       <Typography
    //         variant="p"
    //         sx={{
    //           color: "#9A9A9A",
    //           fontWeight: "400",
    //           fontSize: "18px",
    //         }}
    //       >
    //         Get customized models according to the your needs, trained in
    //         realtime based on your request. Data will be shared using the best
    //         privacy preserving techniques.
    //       </Typography>
    //     </Box>
    //     <Box
    //       sx={{
    //         flex: "1",
    //         alignItems: "center",
    //         textAlign: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <img
    //         src={heroImage}
    //         alt="hero"
    //         style={{
    //           maxWidth: "90%",
    //           marginBottom: "2rem",
    //           padding: "0, 10rem",
    //           alignItems: "center",
    //           textAlign: "center",
    //           justifyContent: "center",
    //         }}
    //       />
    //     </Box>
    //   </CustomBox>
    // </Box>
  );
};

export default Hero;
