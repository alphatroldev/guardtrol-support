import React, { useState } from "react";

import { useGetOrganizationsQuery } from "../../services/organization";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import { Content } from "../../_metronic/layout/components/content";
import { PageTitle } from "../../_metronic/layout/core";
import ReusableTable from "../../components/ReusableTable";
import { useNavigate } from "react-router-dom";
import { usersManagementBreadCrumbs } from "../../breadcrumbs/usersManagementBreadCrumbs";
import { useGetSubscriptionsQuery } from "../../services/subscription";
import { ISubscription } from "../../types/subscription";
import { formatDateTime } from "../../utils/dateUtils";
import CreateSubscriptionForm from "./create-subscription";
import CreateFreeTrialSubscriptionForm from "./create-free-trial-subscription";

const FreeTrialSubscriptions = () => {
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
    plan: "free trial",
    page,
    limit,
  });

  const columns = [
    { header: "Organization", accessor: "organization" },
    { header: "Plan", accessor: "plan" },
    { header: "Beats", accessor: "maxbeats" },
    { header: "Guards", accessor: "maxextraguards" },
    { header: "Date Created", accessor: "createdat" },
    { header: "Start Date", accessor: "startsAt" },
    { header: "Expiry Date", accessor: "expiresat" },
  ];

  const formatSubscriptionsData = (data: ISubscription[]) => {
    return data.map((item: any) => ({
      ...item,
      organization: item.user.name,
      createdat: item.createdat ? formatDateTime(item.createdat) : "",
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
        title={"Free Trial Subscriptions"}
        buttonText={"Create"}
        showButton={true}
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
      <CreateFreeTrialSubscriptionForm
        show={showCreateSubscriptionModal}
        handleClose={() => setShowCreateSubscriptionModal(false)}
      />
    </>
  );
};

export default FreeTrialSubscriptions;
