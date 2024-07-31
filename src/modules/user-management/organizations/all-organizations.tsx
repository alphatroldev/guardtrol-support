import React, { useState } from "react";

import { CreateOrganization } from "./create-organization";
import { useGetOrganizationsQuery } from "../../../services/organization";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import ReusableTable from "../../../components/ReusableTable";
import { useNavigate } from "react-router-dom";
import { usersManagementBreadCrumbs } from "../../../breadcrumbs/usersManagementBreadCrumbs";

const AllOrganizations: React.FC = () => {
  const [showCreateOrganizationModal, setShowCreateOrganizationModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const navigate = useNavigate();

  const handleViewOrganization = (organizationId: string) => {
    console.log("first");
    navigate(`/user-management/organizations/${organizationId}`);
  };

  const { data, error, isLoading, refetch, isFetching } =
    useGetOrganizationsQuery({
      page,
      limit,
    });

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
    { header: "Whatsapp Number", accessor: "whatsappNumber" },
  ];

  return (
    <>
      <PageTitle breadcrumbs={usersManagementBreadCrumbs}>
        Organizations
      </PageTitle>
      <ReusableTable
        data={data?.data.filter((org) => org.isOwner) || []}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        title={"Organizations"}
        buttonText={"Create"}
        onClick={() => setShowCreateOrganizationModal(true)}
        showButton={true}
        onClickView={(organizationId) => handleViewOrganization(organizationId)}
        hasViewBtn={true}
        total={data?.total}
        error={error || null}
        pagination={{
          currentPage: page,
          totalPages: data?.total ? Math.ceil(data?.total / limit) : 0,
          onPageChange: setPage,
        }}
        filters={{
          limit,
          onLimitChange: setLimit,
        }}
        refetch={refetch}
      />
      <CreateOrganization
        show={showCreateOrganizationModal}
        handleClose={() => setShowCreateOrganizationModal(false)}
      />
    </>
  );
};

export default AllOrganizations;
