import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../_metronic/layout/core";
import { Horizontal } from "../wizards/components/Horizontal";
import { usersBreadCrumbs } from "../../breadcrumbs/usersBreadCrumbs";
import AllOrganizations from "./organizations/all";
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
