import React from "react";

import { Box, Typography, Grid, TextField, Button, Link } from "@mui/material";

import heroImage from "../../assets/images/hero.png";

import CustomButton from "../../components/elements/customButton/CustomButton";

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
            Register
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
                buttonText="Register"
                href="/sehatchain/login"
              />
              <Typography
                component="p"
                sx={{
                  mt: 1,
                  fontSize: 16,
                  lineHeight: 2,
                  color: "#001E3C",
                }}
              >
                Already have an account?{" "}
                <Link
                  style={{
                    cursor: "pointer",
                    textTransform: "none",
                    border: 0,
                    textDecoration: "none",
                  }}
                  href="/sehatchain/login"
                >
                  Login instead
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default login;
