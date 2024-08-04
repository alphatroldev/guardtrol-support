import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../_metronic/layout/MasterLayout";
import { AdminDashboardWrapper } from "../modules/dashboard/AdminDashboard";
import UsersRouter from "../modules/users/users-router";
import { WithChildren } from "../_metronic/helpers";
import { getCSSVariableValue } from "../_metronic/assets/ts/_utils";
import TopBarProgress from "react-topbar-progress-indicator";
import UsersManagementRouter from "../modules/user-management/user-management-router";
import SubscriptionsLayout from "../modules/subscriptions/subscriptions-layout";
import SubscriptionsRouter from "../modules/subscriptions/subscriptions-router";
import HelpCenter from "../modules/help-center";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<AdminDashboardWrapper />} />
        <Route path="users/*" element={<UsersRouter />} />
        <Route path="user-management/*" element={<UsersManagementRouter />} />
        <Route
          path="subscription-management/*"
          element={<SubscriptionsRouter />}
        />
        <Route path="help-center" element={<HelpCenter />} />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
