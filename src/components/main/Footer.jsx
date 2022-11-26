import * as React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";

import Logo from "../../assets/images/logos/logo.png";

const Footer = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#001E3C",
    color: "#fff",
    padding: theme.spacing(0, 4),
    display: "flex",
    [theme.breakpoints.down("md")]: {},
  }));

  const FooterLogo = styled("img")(({ theme }) => ({
    maxWidth: "120px",
    [theme.breakpoints.down("md")]: {},
  }));

  return (
    <CustomBox>
      <FooterLogo src={Logo} alt="logo" align="center" />
      <Typography
        variant="p"
        align="right"
        justifyContent="center"
        gutterBottom
      >
        sehatchain.com
      </Typography>
      {/* <Box sx={{ flex: "1", textAlign: "center" }}>
        
      </Box> */}
      {/* <Box sx={{ flex: "1", textAlign: "center" }}>
        <Typography variant="p" align="left" gutterBottom>
          sehatchain.com
        </Typography>
      </Box>
      <Box sx={{ flex: "1", textAlign: "center" }}>
        <Typography variant="p" align="left" gutterBottom>
          sehatchain.com
        </Typography>
      </Box> */}
    </CustomBox>
  );
};

export default Footer;
