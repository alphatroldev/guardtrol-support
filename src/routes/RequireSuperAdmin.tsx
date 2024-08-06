import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const RequireSuperAdmin = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return currentUser?.role === "superadmin" ? (
    <Outlet />
  ) : (
    <Navigate to="/help-center" />
  );
};

export default RequireSuperAdmin;
