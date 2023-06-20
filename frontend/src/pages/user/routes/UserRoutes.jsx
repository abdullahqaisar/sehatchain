import { Routes, Route } from "react-router-dom";

import { UserLayout } from "../../../layouts/UserLayout";
import PageNotFound from "../../error/PageNotFound";
import { Dashboard, NewRequest, ViewTrainedModels } from "..";
import ModelResult from "../modelResult/ModelResult";
import Feedback from "../feedback/Feedback";
import { userItem } from "../../../util/userSidebarItems";

export function UserRoutes() {
  const path = "/sehatchain/user/";
  return (
    <Routes>
      <Route element={<UserLayout props={userItem} path={path} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="newrequest" element={<NewRequest />} />
        <Route path="viewmodels" element={<ViewTrainedModels />} />
        <Route path="viewmodels/:req_id" element={<ModelResult />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
