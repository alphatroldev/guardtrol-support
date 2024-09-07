import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../_metronic/layout/core";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import { Content } from "../../_metronic/layout/components/content";
import { StatisticsWidget5 } from "../../_metronic/partials/widgets";
import { useGetOrganizationsQuery } from "../../features/organization";
import { useGetGuardsQuery } from "../../features/guard";
import { useGetPatrolsQuery } from "../../features/patrol";
import { useGetSubscriptionsQuery } from "../../features/subscription";
import { useGetBeatByIdQuery, useGetBeatsQuery } from "../../features/beat";
import { TicketsOverview } from "./TicketsOverview";
import { OrganizationsStats } from "./components/OrganizationsStats";
import { BeatStatsStats } from "./components/BeatStats";
import { SubscriptionStats } from "./components/SubscriptionStats";
import { GuardStats } from "./components/GuardStats";

const AdminDashboardPage: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data: organizationApiResponse } = useGetOrganizationsQuery({
    isOwner: true,
    page,
    limit,
  });
  const { data: guardsApiResponse } = useGetGuardsQuery({
    page,
    limit,
  });
  const { data: beatsApiResponse } = useGetBeatsQuery({
    page,
    limit,
  });

  const { data: patrolsApiResponse } = useGetPatrolsQuery({
    page,
    limit,
  });
  const { data: subscriptionsApiResponse } = useGetSubscriptionsQuery({
    page,
    limit,
  });

  const { data: activeOrganizationsApiResponse } = useGetOrganizationsQuery({
    page,
    limit,
    isOwner: true,
    status: "enabled",
  });
  const { data: inActiveOrganizationsApiResponse } = useGetOrganizationsQuery({
    page,
    limit,
    isOwner: true,
    status: "disabled",
  });

  return (
    <>
      <ToolbarWrapper />
      <Content>
        {" "}
        <div className="row g-5 g-xl-5">
          <div className="col-xl-3">
            <StatisticsWidget5
              className="card-xl-stretch mb-xl-5"
              svgIcon="people"
              color="white"
              iconColor="primary"
              title={`${organizationApiResponse?.total || 0}`}
              description="Organizations"
            />
          </div>
          <div className="col-xl-3">
            <StatisticsWidget5
              className="card-xl-stretch mb-xl-5"
              svgIcon="cheque"
              color="white"
              iconColor="primary"
              title={`${subscriptionsApiResponse?.total || 0}`}
              description="Subscriptions"
            />
          </div>
          <div className="col-xl-3">
            <StatisticsWidget5
              className="card-xl-stretch mb-xl-5"
              svgIcon="map"
              color="white"
              iconColor="primary"
              title={`${beatsApiResponse?.total || 0}`}
              description="Beats"
            />
          </div>
          <div className="col-xl-3">
            <StatisticsWidget5
              className="card-xl-stretch mb-xl-5"
              svgIcon="lock"
              color="white"
              iconColor="primary"
              title={`${guardsApiResponse?.total || 0}`}
              description="Guards"
            />
          </div>
        </div>
        <div className="row g-5 g-xl-5 mb-sm-5 mb-xl-0">
          {/* <div className="col-xl-3 col-md-6">
            <StatisticsWidget5
              className="card-xl-stretch mb-xl-5"
              svgIcon="chart-simple"
              color="white"
              iconColor="primary"
              title={`${organizationApiResponse?.total || 0}`}
              description="Organizations"
            />
          </div> */}
          <div className="col-xl-3  ">
            <OrganizationsStats
              className="card-xl-stretch mb-xl-5"
              activeOrganizations={activeOrganizationsApiResponse?.total}
              inActiveOrganizations={inActiveOrganizationsApiResponse?.total}
              totalOrganizations={organizationApiResponse?.total}
            />
          </div>
          <div className="col-xl-3 ">
            <SubscriptionStats className="card-xl-stretch mb-xl-5" />

            {/* <StatisticsWidget5
              className="card-xl-stretch mb-xl-5"
              svgIcon="cheque"
              color="white"
              iconColor="primary"
              title={`${subscriptionsApiResponse?.total || 0}`}
              description="Active Subscriptions"
            /> */}
          </div>
          <div className="col-xl-3  ">
            <BeatStatsStats className="card-xl-stretch mb-xl-5" />
          </div>
          <div className="col-xl-3  ">
            <GuardStats className="card-xl-stretch mb-xl-5" />
          </div>

          {/* <div className="col-xl-3 col-md-6">
            <StatisticsWidget5
              className="card-xl-stretch mb-5 mb-xl-5"
              svgIcon="chart-pie-simple"
              color="white"
              iconColor="primary"
              title={`${beatsApiResponse?.total || 0}`}
              description="Beats"
            />
          </div> */}
        </div>
        <div className="row g-5 g-xl-8">
          <div className="col-xl-6 ">
            <TicketsOverview />
          </div>
        </div>
      </Content>
    </>
  );
};

const AdminDashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>Support Dashboard</PageTitle>
      <AdminDashboardPage />
    </>
  );
};

export { AdminDashboardWrapper };
