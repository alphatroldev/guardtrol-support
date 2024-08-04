import React, { useState } from "react";

import { CreateSupportUser } from "./create-support-user";
import { PageTitle } from "../../../_metronic/layout/core";
import ReusableTable from "../../../components/ReusableTable";
import { useNavigate } from "react-router-dom";
import { usersManagementBreadCrumbs } from "../../../breadcrumbs/usersManagementBreadCrumbs";
import { useDebouncedValue } from "../../../utils/helpers";
import { useGetSupportUsersQuery } from "../../../features/support-users";
import { IUser } from "../../../types/auth";

const AllSupportUsers: React.FC = () => {
  const [showCreateSupportUserModal, setShowCreateSupportUserModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [filterParams, setFilterParams] = useState({ search: "" });
  const navigate = useNavigate();

  const handleViewSupportUser = (organizationId: string) => {
    // navigate(`/user-management/support-user/${organizationId}`);
  };
  const handleSearchChange = (e: any) => {
    setFilterParams({ ...filterParams, search: e.target.value });
  };

  const debouncedSearchQuery = useDebouncedValue(filterParams.search);
  console.log(debouncedSearchQuery);
  const { data, error, isLoading, refetch, isFetching } =
    useGetSupportUsersQuery({
      page,
      ...(debouncedSearchQuery && { search: debouncedSearchQuery }),
      limit,
    });

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
  ];

  const formatSupportUsersData = (data: IUser[]) => {
    return data.map((suppirtUser: any) => ({
      ...suppirtUser,
    }));
  };
  return (
    <>
      <PageTitle breadcrumbs={usersManagementBreadCrumbs}>
        SupportUsers
      </PageTitle>
      <ReusableTable
        data={formatSupportUsersData(data?.data || [])}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        title={"Support Users"}
        buttonText={"Create"}
        onClick={() => setShowCreateSupportUserModal(true)}
        showButton={true}
        showSearch={true}
        searchAction={handleSearchChange}
        onClickView={(organizationId) => handleViewSupportUser(organizationId)}
        hasViewBtn={false}
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
      <CreateSupportUser
        show={showCreateSupportUserModal}
        handleClose={() => setShowCreateSupportUserModal(false)}
      />
    </>
  );
};

export default AllSupportUsers;
