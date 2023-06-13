import { Routes, Route } from "react-router-dom";

import { UserLayout } from "../../../layouts/UserLayout";
import PageNotFound from "../../error/PageNotFound";
import { Dashboard, NewRequest, ViewTrainedModels } from "..";
import ModelResult from "../modelResult/ModelResult";
import { userItem } from "../../../util/userSidebarItems";

export function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout props={userItem} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="newrequest" element={<NewRequest />} />
        <Route path="viewmodels" element={<ViewTrainedModels />} />
        <Route path="viewmodels/:req_id" element={<ModelResult />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
