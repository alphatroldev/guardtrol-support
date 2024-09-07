import { FC, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dropdown1 } from "../../../../_metronic/partials";
import AllBeats from "../../../users/beats/all";
import { useGetBeatsQuery } from "../../../../features/beat";
import ReusableTable from "../../../../components/ReusableTable";
import { useGetPatrolsQuery } from "../../../../features/patrol";

const OrganizationPatrols: FC = () => {
  const [showCreateBeatModal, setShowCreateBeatModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { organizationId } = useParams();

  const { data, error, isError, isLoading, refetch, isFetching } =
    useGetPatrolsQuery({
      page,
      limit,
      organization: organizationId,
    });

  const columns = [
    { header: "Name", accessor: "name", lowerCase: false, sortable: false },
    {
      header: "Description",
      accessor: "description",
      lowerCase: false,
      sortable: false,
    },
    {
      header: "Time to complete patrol",
      accessor: "timetocompletepatrol",
      lowerCase: false,
      sortable: false,
    },
    {
      header: "Frequency",
      accessor: "frequency",
      lowerCase: false,
      sortable: false,
    },
  ];
  console.log(data);
  return (
    <>
      <ReusableTable
        data={data?.data || []}
        columns={columns}
        isLoading={isLoading}
        error={error || false}
        isFetching={isFetching}
        title={"Patrols"}
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
    </>
  );
};

export { OrganizationPatrols };
