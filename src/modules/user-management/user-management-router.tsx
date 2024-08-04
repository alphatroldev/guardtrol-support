import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import AllOrganizations from "./organizations/all-organizations";
import UserManagementLayout from "./user-management-layout";
import OrganizationPage from "./organizations/organization-page";
import AllSupportUsers from "./support/all-support-users";

const UsersManagementRouter = () => (
  <Routes>
    <Route element={<UserManagementLayout />}>
      <Route path="organizations" element={<AllOrganizations />} />
      <Route path="support-users" element={<AllSupportUsers />} />
      <Route
        path="organizations/:organizationId/*"
        element={<OrganizationPage />}
      />
      <Route index element={<Navigate to={"organizations"} />} />
    </Route>
  </Routes>
);

export default UsersManagementRouter;
