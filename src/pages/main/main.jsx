import React from "react";
import { Navbar } from "../../components/navbar";
import { Hero, AboutUs } from "../../components/main";

import Footer from "../../components/footer/Footer";

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
