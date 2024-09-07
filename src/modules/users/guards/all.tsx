import React, { useState } from "react";

import CreateBeatForm from "./create-guard";
import { useGetOrganizationsQuery } from "../../../features/organization";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import ReusableTable from "../../../components/ReusableTable";
import { useGetGuardsQuery } from "../../../features/guard";

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
    { header: "Name", accessor: "name", lowerCase: false, sortable: false },
    { header: "Phone", accessor: "phone", lowerCase: false, sortable: false },
    { header: "Status", accessor: "status", lowerCase: false, sortable: false },
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
            totalPages: data?.total ? Math.ceil(data?.total / limit) : 0,
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
