import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../_metronic/layout/core";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import { Content } from "../../_metronic/layout/components/content";

const AdminDashboardPage: FC = () => (
  <>
    <ToolbarWrapper />
    <Content>
      <div className="row g-5 g-xl-10 mb-5 mb-xl-10"></div>
    </Content>
  </>
);

const AdminDashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>Admin Dashboard</PageTitle>
      <AdminDashboardPage />
    </>
  );
};

export { AdminDashboardWrapper };
