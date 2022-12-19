import { Outlet } from "react-router-dom";

import { Navbar } from "../pages/user/components/navbar/Navbar";
import { Footer } from "../components/footer";

export function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
