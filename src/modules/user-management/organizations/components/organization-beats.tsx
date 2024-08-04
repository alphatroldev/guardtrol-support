import { FC, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dropdown1 } from "../../../../_metronic/partials";
import AllBeats from "../../../users/beats/all";
import { useGetBeatsQuery } from "../../../../features/beat";
import ReusableTable from "../../../../components/ReusableTable";
import CreateBeatForm from "./create-beat";

const OrganizationBeats: FC = () => {
  const [showCreateBeatModal, setShowCreateBeatModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { organizationId } = useParams();
  const { data, error, isError, isLoading, refetch, isFetching } =
    useGetBeatsQuery({
      page,
      limit,
      organization: organizationId,
    });

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Address", accessor: "address" },
  ];
  console.log(data);
  return (
    <>
      <ReusableTable
        data={data?.data || []}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error || false}
        title={"Beats"}
        buttonText={"Create"}
        showButton={false}
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
      <CreateBeatForm
        show={showCreateBeatModal}
        handleClose={() => setShowCreateBeatModal(false)}
      />
    </>
  );
};

export { OrganizationBeats };
