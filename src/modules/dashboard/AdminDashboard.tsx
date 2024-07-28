import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../_metronic/layout/core";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import { Content } from "../../_metronic/layout/components/content";
import { StatisticsWidget5 } from "../../_metronic/partials/widgets";
import { useGetOrganizationsQuery } from "../../services/organization";
import { useGetGuardsQuery } from "../../services/guard";
import { useGetPatrolsQuery } from "../../services/patrol";
import { useGetSubscriptionsQuery } from "../../services/subscription";

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

  const { data: patrolsApiResponse } = useGetPatrolsQuery({
    page,
    limit,
  });

  const { data: subscriptionsApiResponse } = useGetSubscriptionsQuery({
    page,
    limit,
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
              title={`${patrolsApiResponse?.total || 0}`}
              description="Patrols"
            />
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
