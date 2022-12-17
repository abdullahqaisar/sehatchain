import { Routes, Route } from "react-router-dom";

import { UserLayout } from "../../../layouts/UserLayout";
import PageNotFound from "../../error/PageNotFound";
import Dashboard from "../";

export function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
