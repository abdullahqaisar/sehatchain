import { Sidebar } from "../components/sidebar";

export function HospitalLayout(sidebarItems) {
  return (
    <>
      <Sidebar sidebarItems={sidebarItems.props} path={sidebarItems.path} />
    </>
  );
}
