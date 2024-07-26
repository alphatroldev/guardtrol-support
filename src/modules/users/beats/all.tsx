import React, { useState } from "react";

import CreateBeatForm from "./create-beat";
import { useGetOrganizationsQuery } from "../../../services/organization";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import ReusableTable from "../../../components/ReusableTable";
import { useGetBeatsQuery } from "../../../services/beat";

const AllBeats: React.FC = () => {
  const [showCreateBeatModal, setShowCreateBeatModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data, error, isLoading, refetch, isFetching } = useGetBeatsQuery({
    page,
    limit,
  });

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
  ];
  console.log(data);
  return (
    <>
      <ToolbarWrapper />
      <Content>
        <PageTitle>Beats</PageTitle>

        <ReusableTable
          data={data?.data || []}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error || null}
          title={"Beats"}
          buttonText={"Create"}
          showButton={true}
          onClick={() => setShowCreateBeatModal(true)}
          total={data?.total}
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
        show={showCreateBeatModal}
        handleClose={() => setShowCreateBeatModal(false)}
      />
    </>
  );
};

export default AllBeats;
