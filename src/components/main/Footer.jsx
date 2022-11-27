import * as React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

import Logo from "../../assets/images/logos/logo.png";

const Footer = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#001E3C",
    color: "#fff",
    padding: theme.spacing(0, 4),
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {},
  }));

  const FooterLogo = styled("img")(({ theme }) => ({
    maxWidth: 120,
    [theme.breakpoints.down("md")]: {
      maxWidth: 80,
    },
  }));

  const FbIcon = styled(FacebookIcon)(({ theme }) => ({
    maxWidth: 40,
    [theme.breakpoints.down("sm")]: { maxWidth: 20 },
  }));

  const InstaIcon = styled(InstagramIcon)(({ theme }) => ({
    maxWidth: 40,
    [theme.breakpoints.down("sm")]: { maxWidth: 20 },
  }));

  const TwIcon = styled(TwitterIcon)(({ theme }) => ({
    maxWidth: 40,
    [theme.breakpoints.down("sm")]: { maxWidth: 20 },
  }));

  const LinkedinIcon = styled(LinkedInIcon)(({ theme }) => ({
    color: "#fff",
    maxWidth: 40,
    [theme.breakpoints.down("sm")]: { maxWidth: 20 },
  }));

  return (
    <CustomBox>
      <Box sx={{ flex: "1", textAlign: "left", alignItems: "center" }}>
        <FooterLogo src={Logo} alt="logo" />
      </Box>

      <Box sx={{ flex: "1", textAlign: "right", alignItems: "center" }}>
        <FbIcon sx={{ mx: 0.5 }} />
        <LinkedinIcon sx={{ mx: 0.5 }} />
        <TwIcon sx={{ mx: 0.5 }} />
        <InstaIcon sx={{ mx: 0.5 }} />
      </Box>
    </CustomBox>
  );
};

export default Footer;
