import React from "react";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import {
  usersManagementBreadCrumbs,
  usersOrganizationManagementBreadCrumbs,
} from "../../../breadcrumbs/usersManagementBreadCrumbs";
import { ProfileHeader } from "../../profile/ProfileHeader";
import { OrganizationHeader } from "./components/organization-header";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { OrganizationBeats } from "./components/organization-beats";
import { OrganizationGuards } from "./components/organization-guards";
import { OrganizationSettings } from "./components/organization-settings";
import { OrganizationPatrols } from "./components/organization-patrols";
import { OrganizationPoints } from "./components/organization-points";
import { OrganizationOverview } from "./components/organization-overview";
import { useGetOrganizationByIdQuery } from "../../../features/organization";
import { Spinner } from "react-bootstrap";
import { ResetOrganizationPassword } from "./components/organization-password-reset";
import { OrganizationSubscriptions } from "./components/organization-subcription";

type Props = {};

const OrganizationPage = () => {
  const params = useParams();

  const { data: organization, isLoading } = useGetOrganizationByIdQuery(
    params.organizationId || "",
    {
      skip: params.organizationId ? false : true,
    }
  );
  return (
    <Routes>
      <Route
        element={
          <>
            <PageTitle
              breadcrumbs={[
                ...usersOrganizationManagementBreadCrumbs,

                {
                  title: `${organization?.name}`,
                  path: "/user-management",
                  isSeparator: false,
                  isActive: false,
                },
                {
                  title: "",
                  path: "",
                  isSeparator: true,
                  isActive: false,
                },
              ]}
            >
              View Organization
            </PageTitle>
            {!isLoading ? (
              <>
                <OrganizationHeader />
                <Outlet />
              </>
            ) : (
              <div className="justify-content-center align-items-center d-flex py-20">
                <Spinner animation="border" className="" />
              </div>
            )}
          </>
        }
      >
        <Route
          path={`overview`}
          element={
            <>
              <PageTitle breadcrumbs={usersOrganizationManagementBreadCrumbs}>
                Overview
              </PageTitle>
              <OrganizationOverview />
            </>
          }
        />
        <Route
          path={`beats`}
          element={
            <>
              <PageTitle breadcrumbs={usersOrganizationManagementBreadCrumbs}>
                Beats
              </PageTitle>
              <OrganizationBeats />
            </>
          }
        />
        <Route
          path={`guards`}
          element={
            <>
              <PageTitle breadcrumbs={usersOrganizationManagementBreadCrumbs}>
                Guards
              </PageTitle>
              <OrganizationGuards />
            </>
          }
        />
        <Route
          path={`patrols`}
          element={
            <>
              <PageTitle breadcrumbs={usersOrganizationManagementBreadCrumbs}>
                Patrols
              </PageTitle>
              <OrganizationPatrols />
            </>
          }
        />
        <Route
          path={`points`}
          element={
            <>
              <PageTitle breadcrumbs={usersOrganizationManagementBreadCrumbs}>
                Points
              </PageTitle>
              <OrganizationPoints />
            </>
          }
        />
        <Route
          path={`subscriptions`}
          element={
            <>
              <PageTitle breadcrumbs={usersOrganizationManagementBreadCrumbs}>
                Subscriptions
              </PageTitle>
              <OrganizationSubscriptions />
            </>
          }
        />
        <Route
          path={`settings`}
          element={
            <>
              <PageTitle breadcrumbs={usersOrganizationManagementBreadCrumbs}>
                Settings
              </PageTitle>
              <OrganizationSettings />
              <ResetOrganizationPassword />
            </>
          }
        />
        <Route
          index
          element={
            <Navigate
              to={`/user-management/organizations/${params?.organizationId}/overview`}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default OrganizationPage;
