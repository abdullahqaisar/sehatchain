import { Routes, Route } from "react-router-dom";

import Main from "../pages/main/Main";
import Login from "../pages/auth/Login";
import PageNotFound from "../pages/error/PageNotFound";
import { UserRoutes } from "../pages/user/routes/UserRoutes";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="sehatchain">
        <Route index element={<Main />} />
        <Route path="user/*" element={<UserRoutes />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
