import React from "react";
import { Content } from "../../_metronic/layout/components/content";
import { Outlet } from "react-router-dom";
import { usersManagementBreadCrumbs } from "../../breadcrumbs/usersManagementBreadCrumbs";
import { PageTitle } from "../../_metronic/layout/core";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";

type Props = {};

const UserManagementLayout = (props: Props) => {
  return (
    <>
      <PageTitle breadcrumbs={usersManagementBreadCrumbs} />
      <ToolbarWrapper />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

export default UserManagementLayout;
