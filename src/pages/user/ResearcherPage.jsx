import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Box } from "@mui/material";

import Navbar from "../../components/researcher/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ResearcherDashboard from "./ResearcherDashboard";

const ResearcherPage = () => {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<ResearcherDashboard />} />
        <Route path="/u/dashboard" element={<ResearcherDashboard />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default ResearcherPage;
