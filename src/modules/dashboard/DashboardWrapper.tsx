import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../_metronic/layout/core";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import { Content } from "../../_metronic/layout/components/content";

const DashboardPage: FC = () => (
  <>
    <ToolbarWrapper />
    <Content>
      <div className="row g-5 g-xl-10 mb-5 mb-xl-10"></div>
    </Content>
  </>
);

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
