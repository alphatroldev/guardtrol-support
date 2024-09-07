import React, { useState } from "react";

import { useGetOrganizationsQuery } from "../../features/organization";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import { Content } from "../../_metronic/layout/components/content";
import { PageTitle } from "../../_metronic/layout/core";
import ReusableTable from "../../components/ReusableTable";
import { useNavigate } from "react-router-dom";
import { usersManagementBreadCrumbs } from "../../breadcrumbs/usersManagementBreadCrumbs";
import { useGetSubscriptionsQuery } from "../../features/subscription";
import { ISubscription } from "../../types/subscription";
import { formatDateTime } from "../../utils/dateUtils";
import CreateSubscriptionForm from "./create-subscription";
import { formatToNaira } from "../../utils/formatters";

const AllSubscriptions = () => {
  const [showCreateSubscriptionModal, setShowCreateSubscriptionModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const {
    data: subscriptionsApiResponse,
    error,
    isError,
    isLoading,
    refetch,
    isFetching,
  } = useGetSubscriptionsQuery({
    page,
    limit,
    type: "active",
  });

  const columns = [
    {
      header: "Organization",
      accessor: "organization",
      minw: "176px",
      lowerCase: false,
      sortable: false,
    },
    { header: "Plan", accessor: "plan", lowerCase: false, sortable: false },
    {
      header: "Beats",
      accessor: "maxbeats",
      lowerCase: false,
      sortable: false,
    },
    {
      header: "Guards",
      accessor: "maxextraguards",
      lowerCase: false,
      sortable: false,
    },
    {
      header: "Total",
      accessor: "totalamount",
      lowerCase: false,
      sortable: false,
    },
    {
      header: "Gateway",
      accessor: "paymentgateway",
      lowerCase: false,
      sortable: false,
    },
    {
      header: "Date Created",
      accessor: "createdat",
      minw: "176px",
      lowerCase: false,
      sortable: false,
    },
    {
      header: "Start Date",
      accessor: "startsAt",
      minw: "176px",
      lowerCase: false,
      sortable: false,
    },
    {
      header: "Expiry Date",
      accessor: "expiresat",
      minw: "176px",
      lowerCase: false,
      sortable: false,
    },
  ];

  const formatSubscriptionsData = (data: ISubscription[]) => {
    return data.map((item: any) => ({
      ...item,
      createdat: item.createdat ? formatDateTime(item.createdat) : "",
      organization: item?.user?.name,
      totalamount: formatToNaira(item.totalamount),
      startsAt: item.startsAt ? formatDateTime(item.startsAt) : "",
      expiresat: item.expiresat ? formatDateTime(item.expiresat) : "",
    }));
  };
  return (
    <>
      <ReusableTable
        data={formatSubscriptionsData(subscriptionsApiResponse?.data || [])}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error || false}
        title={"Subscriptions"}
        buttonText={"Free Trial"}
        showButton={false}
        onClick={() => setShowCreateSubscriptionModal(true)}
        total={subscriptionsApiResponse?.total}
        pagination={{
          currentPage: page,
          totalPages: subscriptionsApiResponse?.total
            ? Math.ceil(subscriptionsApiResponse?.total / limit)
            : 0,
          onPageChange: setPage,
        }}
        filters={{
          limit,
          onLimitChange: setLimit,
        }}
        refetch={refetch}
      />
      <CreateSubscriptionForm
        show={showCreateSubscriptionModal}
        handleClose={() => setShowCreateSubscriptionModal(false)}
      />
    </>
  );
};

export default AllSubscriptions;
