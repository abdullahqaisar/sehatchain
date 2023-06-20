import { Routes, Route } from "react-router-dom";

import { HospitalLayout } from "../../../layouts";
import PageNotFound from "../../error/PageNotFound";
import { Dashboard, Requests, NewPatient, Feedback } from "..";
import { hospitalItem } from "../../../util/hospitalSidebarItems";

export function HospitalRoutes() {
  const path = "/sehatchain/hospital/";
  return (
    <Routes>
      <Route element={<HospitalLayout props={hospitalItem} path={path} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients/add" element={<NewPatient />} />
        <Route path="requests" element={<Requests />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
