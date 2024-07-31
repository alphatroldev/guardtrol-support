import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import AllOrganizations from "./all-subscriptions";
import UserManagementLayout from "./subscriptions-layout";
import AllSubscriptions from "./all-subscriptions";
import SubscriptionsLayout from "./subscriptions-layout";
import FreeTrialSubscriptions from "./free-trial-subscriptions";

const SubscriptionsRouter = () => (
  <Routes>
    <Route element={<SubscriptionsLayout />}>
      <Route path="all-subscriptions" element={<AllSubscriptions />} />
      <Route path="free-trial" element={<FreeTrialSubscriptions />} />
      <Route index element={<Navigate to={"all-subscriptions"} />} />
    </Route>
  </Routes>
);

export default SubscriptionsRouter;
