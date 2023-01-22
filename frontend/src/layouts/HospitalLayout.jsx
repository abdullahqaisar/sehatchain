import { Outlet } from "react-router-dom";

import { Navbar } from "../pages/hospital/components/navbar/Navbar";
import { Footer } from "../components/footer";

export function HospitalLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
