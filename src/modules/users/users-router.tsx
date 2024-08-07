import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import AllOrganizations from "../user-management/support/all-support-users";
import AllGuards from "./guards/all";
import AllBeats from "./beats/all";

const UsersRouter = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path="organizations" element={<AllOrganizations />} />
      <Route path="guards" element={<AllGuards />} />
      <Route path="beats" element={<AllBeats />} />
    </Route>
  </Routes>
);

export default UsersRouter;
