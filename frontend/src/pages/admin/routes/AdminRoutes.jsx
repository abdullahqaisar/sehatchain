import { Routes, Route } from "react-router-dom";

import { AdminLayout } from "../../../layouts";
import PageNotFound from "../../error/PageNotFound";
import { Dashboard } from "..";

export function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route path="patients" element={<Patients />} />
        <Route path="newpatient" element={<NewPatient />} />
        <Route path="requests" element={<Requests />} /> */}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
