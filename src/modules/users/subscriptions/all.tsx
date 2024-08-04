import React, { useState } from "react";

import { CreateSubscription } from "./create-subscriptions";
import { useGetSubscriptionsQuery } from "../../../features/subscription";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle } from "../../../_metronic/layout/core";
import ReusableTable from "../../../components/ReusableTable";

const AllSubscriptions: React.FC = () => {
  const [showCreateSubscriptionModal, setShowCreateSubscriptionModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data, error, isLoading, refetch, isFetching } =
    useGetSubscriptionsQuery({
      page,
      limit,
    });

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
    { header: "Whatsapp Number", accessor: "whatsappNumber" },
  ];

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <PageTitle>Subscriptions</PageTitle>

        <ReusableTable
          data={data?.data || []}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          title={"Subscriptions"}
          buttonText={"Create"}
          onClick={() => setShowCreateSubscriptionModal(true)}
          showButton={true}
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

        <CreateSubscription
          show={showCreateSubscriptionModal}
          handleClose={() => setShowCreateSubscriptionModal(false)}
        />
      </Content>
    </>
  );
};

export default AllSubscriptions;
