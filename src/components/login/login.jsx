import React from "react";

import { Box, Typography, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";

import heroImage from "../../assets/images/hero.png";

import CustomButton from "../customButton/CustomButton";

function login() {
  return (
    <Box>
      <Grid
        container
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          container
          md={6}
          sx={{
            backgroundColor: "#001E3C",
            minHeight: { xs: "50vh", md: "100vh" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            sx={{
              mb: 4,
            }}
          >
            <Box>
              <img
                src={heroImage}
                alt="main"
                style={{
                  maxWidth: "80%",
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid md={6} item>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: 30, md: 55 },
              letterSpacing: 0,
              fontWeight: "bold",
              lineHeight: 2,
              color: "#001E3C",
            }}
          >
            Sign in
          </Typography>

          <Grid
            container
            md={12}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              md={6}
              item
              sx={{
                mx: { xs: 4, md: 0 },
                mb: 4,
              }}
            >
              <TextField
                label="Email"
                email
                defaultValue=""
                sx={{
                  width: "100%",
                  mb: 2,
                }}
              />
              <TextField
                label="Password"
                password
                defaultValue=""
                sx={{
                  width: "100%",
                  mb: 2,
                }}
              />
              <CustomButton
                backgroundColor="#217BF4"
                color="#fff"
                
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default login;
