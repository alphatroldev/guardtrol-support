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
  const [filterParams, setFilterParams] = useState<any>({
    search: "",
    subscriptionstatus: "",
    status: "",
    sortBy: "createdAt",
    sortOrder: -1,
  });
  const navigate = useNavigate();

  const handleViewOrganization = (organizationId: string) => {
    navigate(`/user-management/organizations/${organizationId}`);
  };
  const handleSearchChange = (e: any) => {
    setFilterParams({ ...filterParams, search: e.target.value });
  };

  const debouncedFilterParams = useDebouncedValue(filterParams);

  const { data, error, isLoading, refetch, isFetching } =
    useGetOrganizationsQuery({
      isOwner: true,
      ...(debouncedFilterParams?.subscriptionstatus && {
        subscriptionStatus: debouncedFilterParams.subscriptionstatus,
      }),
      ...(debouncedFilterParams?.status && {
        status: debouncedFilterParams.status,
      }),
      page,
      ...(debouncedFilterParams.search && {
        search: debouncedFilterParams.search,
      }),
      ...(debouncedFilterParams?.sortBy && {
        sortBy: debouncedFilterParams.sortBy,
      }),
      ...(debouncedFilterParams?.sortOrder && {
        sortOrder: debouncedFilterParams.sortOrder,
      }),
      limit,
    });

  const columns = [
    { header: "Name", accessor: "name", lowerCase: false, sortable: true },
    { header: "Email", accessor: "email", lowerCase: true, sortable: true },
    {
      header: "Subscription Status",
      accessor: "subscriptionStatus",
      lowerCase: false,
    },
  ];
  const handleSort = (col: any) => {
    console.log(filterParams.sortOrder);
    if (filterParams.sortOrder === -1) {
      setFilterParams({
        ...filterParams,
        sortBy: col,
        sortOrder: 1,
      });
    } else if (!filterParams.sortOrder) {
      setFilterParams({
        ...filterParams,
        sortBy: col,
        sortOrder: -1,
      });
    } else {
      setFilterParams({
        ...filterParams,
        sortBy: undefined,
        sortOrder: undefined,
      });
    }
  };

  const formatSubscriptionsData = (data: IOrganization[]) => {
    return data.map((org: any) => {
      let subscriptionStatus = org?.subscriptions?.find(
        (sub: ISubscription) => {
          // if (filterParams.subscriptionstatus === "active") {
          return (
            new Date(`${sub.startsAt}`) < new Date() &&
            new Date(`${sub.expiresat}`) > new Date()
          );
          // } else if (filterParams.subscriptionstatus === "inactive") {
          //   return (
          //     new Date(`${sub.startsAt}`) < new Date() &&
          //     new Date(`${sub.expiresat}`) > new Date()
          //   );
          // } else {
          //   return true;
          // }
        }
      );
      if (subscriptionStatus?.plan === "free trial") {
        subscriptionStatus = "free trial";
      } else if (subscriptionStatus && subscriptionStatus?.plan !== "active") {
        subscriptionStatus = "active";
      } else if (!subscriptionStatus) {
        subscriptionStatus = "inactive";
      }
      return {
        ...org,
        subscriptionStatus:
          subscriptionStatus === "active" ? (
            <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">
              Active
            </span>
          ) : subscriptionStatus === "free trial" ? (
            <span className="badge badge-light-info fw-bolder fs-8 px-2 py-1 ms-2">
              Demo
            </span>
          ) : (
            <span className="badge badge-light-warning fw-bolder fs-8 px-2 py-1 ms-2">
              Inactive
            </span>
          ),
      };
    });
  };
  const tableFilters = [
    {
      name: "Subscription Status",
      onchange: (value: string) =>
        setFilterParams({ ...filterParams, subscriptionstatus: value }),
      filterOptions: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Demo", value: "demo" },
      ],
    },
    {
      name: "User Status",
      onchange: (value: string) =>
        setFilterParams({ ...filterParams, status: value }),
      filterOptions: [
        { label: "Enabled", value: "enabled" },
        { label: "Disabled", value: "disabled" },
      ],
    },
  ];
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
        handleSort={handleSort}
        sortOrder={filterParams.sortOrder}
        sortBy={filterParams.sortBy}
        onClick={() => setShowCreateOrganizationModal(true)}
        showButton={true}
        showSearch={true}
        searchAction={handleSearchChange}
        onClickView={(organizationId) => handleViewOrganization(organizationId)}
        hasViewBtn={true}
        tableFilters={tableFilters}
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
