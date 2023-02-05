import { Routes, Route } from "react-router-dom";

import { UserLayout } from "../../../layouts/UserLayout";
import PageNotFound from "../../error/PageNotFound";
import { Dashboard, NewRequest, ViewTrainedModels } from "..";
import TrainingResults from "../trainingResults/TrainingResults";
import { ProtectedRoute } from "./ProtectedRoutes";

export function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="models/*"> */}
          <Route
            path="newrequest"
            element={
              <ProtectedRoute>
                <NewRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="completed"
            element={
              <ProtectedRoute>
                <TrainingResults />
              </ProtectedRoute>
            }
          />
          <Route
            index
            element={
              <ProtectedRoute>
                <ViewTrainedModels />
              </ProtectedRoute>
            }
          />
        </Route>
      {/* </Route> */}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
