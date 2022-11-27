import React from "react";
import { Navbar } from "../../components/navbar";
import { Hero, AboutUs } from "../../components/main";
import { Box } from "@mui/system";

import Footer from "../../components/footer/Footer";

export default function Main() {
  return (
    <Box>
      <Navbar />
      <Hero />
      <AboutUs />
      <Footer />
    </Box>
  );
}
