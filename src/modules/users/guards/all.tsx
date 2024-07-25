import React, { useState } from "react";

import CreateBeatForm from "./create-guard";
import { useGetOrganizationsQuery } from "../../../services/organization";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import ReusableTable from "../../../components/ReusableTable";
import { useGetGuardsQuery } from "../../../services/guard";

const AllGuards: React.FC = () => {
  const [showCreateGuardModal, setShowCreateGuardModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data, error, isLoading, refetch, isFetching } = useGetGuardsQuery({
    page,
    limit,
  });

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Phone", accessor: "phone" },
    { header: "Status", accessor: "status" },
  ];
  console.log(data);
  return (
    <>
      <ToolbarWrapper />
      <Content>
        <PageTitle>Guards</PageTitle>

        <ReusableTable
          data={data?.data || []}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          title={"Guards"}
          buttonText={"Create"}
          showButton={true}
          onClick={() => setShowCreateGuardModal(true)}
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
      </Content>
      <CreateBeatForm
        show={showCreateGuardModal}
        handleClose={() => setShowCreateGuardModal(false)}
      />
    </>
  );
};

export default AllGuards;
