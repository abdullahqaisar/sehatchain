import { Outlet } from "react-router-dom";

import { Navbar } from "../pages/user/components/navbar/Navbar";
import { Sidebar } from "../components/sidebar";

export function UserLayout(sidebarItems) {
  return (
    <>

      <Sidebar sidebarItems={sidebarItems.props}/>
    </>
  );
}
