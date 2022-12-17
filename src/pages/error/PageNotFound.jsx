import { Box, Typography } from "@mui/material";

function login() {
  return (
    <Box>
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
        404
      </Typography>
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
        Page Not Found
      </Typography>
    </Box>
  );
}

export default login;
