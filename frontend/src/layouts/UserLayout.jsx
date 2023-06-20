
import { Sidebar } from "../components/sidebar";

export function UserLayout(sidebarItems) {
  return (
    <>

      <Sidebar sidebarItems={sidebarItems.props} path={sidebarItems.path} />
    </>
  );
}
