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
import { useGetOrganizationByIdQuery } from "../../../services/organization";

type Props = {};

const OrganizationPage = () => {
  const params = useParams();

  const { data: organization } = useGetOrganizationByIdQuery(
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
            <OrganizationHeader />
            <Outlet />
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
          path={`settings`}
          element={
            <>
              <PageTitle breadcrumbs={usersOrganizationManagementBreadCrumbs}>
                Settings
              </PageTitle>
              <OrganizationSettings />
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
