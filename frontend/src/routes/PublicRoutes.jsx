import { Routes, Route } from "react-router-dom";

import Main from "../pages/main/Main";
import Login from "../pages/auth/Login";
import HospitalLogin from "../pages/auth/HospitalLogin";
import HospitalRegister from "../pages/auth/HospitalRegister";
import AdminLogin from "../pages/auth/admin/AdminLogin";
import AdminRegister from "../pages/auth/admin/AdminRegister";
import Register from "../pages/auth/Register";
import PageNotFound from "../pages/error/PageNotFound";
import { UserRoutes } from "../pages/user/routes/UserRoutes";
import { HospitalRoutes } from "../pages/hospital/routes/HospitalRoutes";
import { AdminRoutes } from "../pages/admin/routes/AdminRoutes";
import { ProtectedRoute } from "./ProtectedRoute";
import { HospitalProtectedRoute } from "./HospitalProtectedRoute";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="sehatchain">
        <Route index element={<Main />} />
        <Route
          path="user/*"
          element={
            <ProtectedRoute>
              <UserRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="hospital/*"
          element={
            <HospitalProtectedRoute>
              <HospitalRoutes />
            </HospitalProtectedRoute>
          }
        />
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/register" element={<AdminRegister />} />
        <Route path="hospital/login" element={<HospitalLogin />} />
        <Route path="hospital/register" element={<HospitalRegister />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
