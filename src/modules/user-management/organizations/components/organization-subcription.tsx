import { FC, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dropdown1 } from "../../../../_metronic/partials";
import AllSubscriptions from "../../../users/beats/all";
import { useGetSubscriptionsQuery } from "../../../../services/subscription";
import ReusableTable from "../../../../components/ReusableTable";

import { ISubscription } from "../../../../types/subscription";
import { formatDateTime } from "../../../../utils/dateUtils";
import CreateSubscriptionForm from "./create-subscription";

const OrganizationSubscriptions: FC = () => {
  const [showCreateSubscriptionModal, setShowCreateSubscriptionModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { organizationId } = useParams();

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
    organization: organizationId,
  });

  const columns = [
    { header: "Plan", accessor: "plan" },
    { header: "Beats", accessor: "maxbeats" },
    { header: "Guards", accessor: "maxextraguards" },
    { header: "Total", accessor: "totalamount" },
    { header: "Gateway", accessor: "paymentgateway" },
    { header: "Date Created", accessor: "createdat" },
    { header: "Start Date", accessor: "startsAt" },
    { header: "Expiry Date", accessor: "expiresat" },
  ];

  const formatSubscriptionsData = (data: ISubscription[]) => {
    return data.map((item) => ({
      ...item,
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
        title={"Subscriptions"}
        buttonText={"Create"}
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

export { OrganizationSubscriptions };
