import React from "react";
import { AboutUs, Hero } from "../../components/main";
import { Navbar } from "../../components/navbar";
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
