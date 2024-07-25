import React, { useState } from "react";

import { CreateOrganization } from "./create-organization";
import { useGetOrganizationsQuery } from "../../../services/organization";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import ReusableTable from "../../../components/ReusableTable";

const AllOrganizations: React.FC = () => {
  const [showCreateOrganizationModal, setShowCreateOrganizationModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

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
      <ToolbarWrapper />
      <Content>
        <PageTitle>Organizations</PageTitle>

        <ReusableTable
          data={data?.data || []}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          title={"Organizations"}
          buttonText={"Create"}
          onClick={() => setShowCreateOrganizationModal(true)}
          showButton={true}
          total={data?.total}
          error={error || null}
          pagination={{
            currentPage: page,
            totalPages: Math.ceil(data?.total / limit),
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
      </Content>
    </>
  );
};

export default AllOrganizations;
