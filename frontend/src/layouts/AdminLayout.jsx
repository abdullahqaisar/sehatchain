import { Outlet } from "react-router-dom";

import { Navbar } from "../pages/admin/components/navbar/Navbar";

export function AdminLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
