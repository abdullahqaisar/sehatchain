import { Routes, Route } from "react-router-dom";

import { HospitalLayout } from "../../../layouts";
import PageNotFound from "../../error/PageNotFound";
import { Dashboard, Patients, Requests, NewPatient } from "..";

export function HospitalRoutes() {
  return (
    <Routes>
      <Route element={<HospitalLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="newpatient" element={<NewPatient />} />
        <Route path="requests" element={<Requests />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
