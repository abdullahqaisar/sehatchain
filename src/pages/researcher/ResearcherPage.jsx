import * as React from "react";

import { Box, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";

import Navbar from "../../components/researcher/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ResearcherDashboard from "./ResearcherDashboard";

const ResearcherPage = () => {
  return (
    <Box>
      <Navbar />
      <ResearcherDashboard />
      <Footer />
    </Box>
  );
};

export default ResearcherPage;
