import React from "react";
import { Content } from "../../_metronic/layout/components/content";
import { Outlet } from "react-router-dom";
import { usersManagementBreadCrumbs } from "../../breadcrumbs/usersManagementBreadCrumbs";
import { PageTitle } from "../../_metronic/layout/core";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import { subscriptionBreadCrumbs } from "../../breadcrumbs/subscriptionBreadCrumbs";

type Props = {};

const SubscriptionsLayout = (props: Props) => {
  return (
    <>
      <PageTitle breadcrumbs={subscriptionBreadCrumbs} />
      <ToolbarWrapper />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

export default SubscriptionsLayout;
