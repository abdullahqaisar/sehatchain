import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Box } from "@mui/material";

import Navbar from "../../components/user/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Dashboard from "./Dashboard";

const ResearcherPage = () => {
  return (
    <Box>
      {/* <Navbar /> */}
      <Dashboard />
      {/* <Route path="" element={<ResearcherDashboard />} /> */}
      <Footer />
    </Box>
  );
};

export default ResearcherPage;
