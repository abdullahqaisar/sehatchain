import React from "react";

import { Box, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";

import CustomButton from "../customButton/CustomButton"

function login() {
  return (
    <Box>
      <Grid container >
        <Grid
          item
          md={6}
          sx={{
            backgroundColor: "#001E3C",
            pt: 6,
            pb: { xs: 12, md: 12 },
            px: { xs: 3, sm: 6, md: 6 },
          }}
        ></Grid>
        <Grid md={6} item>
        {/* email and pass input with button */}
            <Box
                sx={{
                width: "100%",
                maxWidth: 400,
                p: 3,
                margin: "auto",
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                Sign in
                </Typography>
                <input
                sx={{ mb: 2 }}
                placeholder="Email"
                type="email"
                />
                <input
                sx={{ mb: 2 }}
                placeholder="Password"
                type="password"
                />
                <CustomButton
                sx={{ mt: 2 }}
                variant="contained"
                backgroundColor= "#001E3C"
                color="primary"
                />
            </Box>


        </Grid>
      </Grid>
    </Box>
  );
}

export default login;
