import React, { useState } from "react";

import { CreateOrganization } from "./create-organization";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import ReusableTable from "../../../components/ReusableTable";
import { useNavigate } from "react-router-dom";
import { usersManagementBreadCrumbs } from "../../../breadcrumbs/usersManagementBreadCrumbs";
import { IOrganization } from "../../../types/organization";
import { ISubscription } from "../../../types/subscription";
import { useDebouncedValue } from "../../../utils/helpers";
import { useGetOrganizationsQuery } from "../../../features/organization";

const AllOrganizations: React.FC = () => {
  const [showCreateOrganizationModal, setShowCreateOrganizationModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [filterParams, setFilterParams] = useState({ search: "" });
  const navigate = useNavigate();

  const handleViewOrganization = (organizationId: string) => {
    navigate(`/user-management/organizations/${organizationId}`);
  };
  const handleSearchChange = (e: any) => {
    setFilterParams({ ...filterParams, search: e.target.value });
  };

  const debouncedSearchQuery = useDebouncedValue(filterParams.search);
  console.log(debouncedSearchQuery);
  const { data, error, isLoading, refetch, isFetching } =
    useGetOrganizationsQuery({
      isOwner: true,
      page,
      ...(debouncedSearchQuery && { search: debouncedSearchQuery }),
      limit,
    });

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Subscription status", accessor: "subscriptionStatus" },
  ];

  const formatSubscriptionsData = (data: IOrganization[]) => {
    return data.map((org: any) => ({
      ...org,
      subscriptionStatus: org?.subscriptions?.find((sub: ISubscription) => {
        console.log(org?.subscriptions);
        return (
          new Date(`${sub.startsAt}`) < new Date() &&
          new Date(`${sub.expiresat}`) > new Date()
        );
      }) ? (
        <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">
          Active
        </span>
      ) : (
        <span className="badge badge-light-warning fw-bolder fs-8 px-2 py-1 ms-2">
          Inactive
        </span>
      ),
    }));
  };
  return (
    <>
      <PageTitle breadcrumbs={usersManagementBreadCrumbs}>
        Organizations
      </PageTitle>
      <ReusableTable
        data={formatSubscriptionsData(data?.data || [])}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        title={"Organizations"}
        buttonText={"Create"}
        onClick={() => setShowCreateOrganizationModal(true)}
        showButton={true}
        showSearch={true}
        searchAction={handleSearchChange}
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
