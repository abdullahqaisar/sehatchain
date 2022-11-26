import React from "react";
import { AboutUs, Hero, Navbar } from "../../components/main";
import Footer from "../../components/main/Footer";

export default function Main() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutUs />
      <Footer />
    </div>
  );
}
