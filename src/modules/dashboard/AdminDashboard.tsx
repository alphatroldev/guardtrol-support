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

const AdminDashboardPage: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data: organizationApiResponse } = useGetOrganizationsQuery({
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
  console.log(Date.now());
  const { data: subscriptionsApiResponse } = useGetSubscriptionsQuery({
    page,
    limit,
    type: "active",
  });

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className="row g-5 g-xl-8">
          <div className="col-xl-3 col-md-6">
            <StatisticsWidget5
              className="card-xl-stretch mb-xl-8"
              svgIcon="chart-simple"
              color="white"
              iconColor="primary"
              title={`${organizationApiResponse?.total || 0}`}
              description="Organizations"
            />
          </div>

          <div className="col-xl-3 col-md-6">
            <StatisticsWidget5
              className="card-xl-stretch mb-xl-8"
              svgIcon="cheque"
              color="white"
              iconColor="primary"
              title={`${subscriptionsApiResponse?.total || 0}`}
              description="Active Subscriptions"
            />
          </div>

          <div className="col-xl-3 col-md-6">
            <StatisticsWidget5
              className="card-xl-stretch mb-xl-8"
              svgIcon="briefcase"
              color="white"
              iconColor="primary"
              title={`${guardsApiResponse?.total || 0}`}
              description="Guards"
            />
          </div>

          <div className="col-xl-3 col-md-6">
            <StatisticsWidget5
              className="card-xl-stretch mb-5 mb-xl-8"
              svgIcon="chart-pie-simple"
              color="white"
              iconColor="primary"
              title={`${beatsApiResponse?.total || 0}`}
              description="Beats"
            />
          </div>
        </div>
        <div className="row g-5 g-xl-8">
          <div className="col-6">
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
