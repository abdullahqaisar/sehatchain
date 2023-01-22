import { React } from "react";

import { Box } from "@mui/system";

import { Navbar } from "../../components/navbar";
import {
  Hero,
  AboutUs,
  Features,
  OurGoal,
  ContactUs,
} from "./components";
import Footer from "../../components/footer/Footer";

export default function Main() {
  return (
    <Box>
      <Navbar />
      <Hero />
      <AboutUs />
      <Features />
      <OurGoal />
      <ContactUs />
      <Footer />
    </Box>
  );
}
