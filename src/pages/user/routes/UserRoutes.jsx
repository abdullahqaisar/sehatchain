import { Routes, Route } from "react-router-dom";

import { UserLayout } from "../../../layouts/UserLayout";
import PageNotFound from "../../error/PageNotFound";
import { Dashboard, NewRequest, ViewTrainedModels } from "../";

export function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="newrequest" element={<NewRequest />} />
        <Route path="viewmodels" element={<ViewTrainedModels />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
