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
import HelpCenterOverview from "../modules/help-center/overveiw";
import HelpCenterFAQ from "../modules/help-center/faq/all";
import HelpCenterTickets from "../modules/help-center/tickets";
import Ticket from "../modules/help-center/tickets/ticket";
import CreateTicket from "../modules/help-center/tickets/createTicket";
import CreateTicketCategory from "../modules/help-center/tickets/createTicketCategory";
import CreateFaqCategory from "../modules/help-center/faq/createFaqCategory";
import CreateFaq from "../modules/help-center/faq/createFaq";
import RequireSuperAdmin from "./RequireSuperAdmin";

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
        <Route path="help-center/*" element={<HelpCenter />} />
        <Route path="/help-center" element={<HelpCenter />}>
          <Route path="overview" element={<HelpCenterOverview />} />
          <Route path="faq" element={<HelpCenterFAQ />} />
          <Route path="tickets" element={<HelpCenterTickets />} />
          <Route path="ticket/:ticketId" element={<Ticket />} />
          <Route element={<RequireSuperAdmin />}>
            <Route path="create-ticket" element={<CreateTicket />} />
            <Route path="create-faq-category" element={<CreateFaqCategory />} />
            <Route
              path="create-ticket-category"
              element={<CreateTicketCategory />}
            />
            <Route path="edit-ticket/:ticketId" element={<CreateTicket />} />
            <Route path="faq/edit-faq/:faqId" element={<CreateFaq />} />

            <Route path="create-faq" element={<CreateFaq />} />
          </Route>
        </Route>
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
