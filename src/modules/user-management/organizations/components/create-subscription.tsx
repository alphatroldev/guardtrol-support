import React, { useEffect } from "react";
import * as Yup from "yup";
import ReusableForm from "../../../../components/form/ReusableFormModal";
import { useParams } from "react-router-dom";
import {
  useGetOrganizationByIdQuery,
  useGetOrganizationsQuery,
} from "../../../../features/organization";
import { useCreateSubscriptionMutation } from "../../../../features/subscription";
import { toast } from "react-toastify";

const today = new Date();

const subscriptionInitialValues = {
  plan: "",
  maxbeats: 0,
  maxextraguards: 0,
  totalamount: 0,
  paymentgateway: "",
  duration: "",
  startsAt: "",
  expiresat: "",
};

type Props = {
  show: boolean;
  handleClose: () => void;
};

const CreateSubscriptionForm = ({ show, handleClose }: Props) => {
  const { organizationId } = useParams();
  const [createSubscription, { isLoading: isCreatingSubscription }] =
    useCreateSubscriptionMutation();

  const {
    data: organizationApiResponse,
    error,
    refetch,
    isFetching,
  } = useGetOrganizationsQuery({
    page: 10,
    limit: 0,
  });
  const subscriptionAttributes = [
    {
      name: "maxbeats",
      label: "Max Beats",
      type: "number",
      placeholder: "Enter max beats",
      validation: Yup.number().required("Max beats is required").min(0),
    },
    {
      name: "maxextraguards",
      label: "Max Extra Guards",
      type: "number",
      placeholder: "Enter max extra guards",
      validation: Yup.number().min(0),
    },
    {
      name: "organization",
      label: "Organization",
      type: "select",
      validation: Yup.string().required("Organization is required"),
      options: [
        ...(organizationApiResponse?.data
          ? organizationApiResponse?.data.map((e) => ({
              value: e._id,
              label: e.name,
            }))
          : []),
      ],
    },
  ];
  const { data: organization, isLoading } = useGetOrganizationByIdQuery(
    organizationId || "",
    {
      skip: !organizationId,
    }
  );

  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {};

  const handleSubscriptionSubmit = async (values: any) => {
    const durationMapping: any = {
      freetrial: 0,
      "7days": 7,
      "2weeks": 14,
      "1month": 30,
    };

    const response = await createSubscription({
      organizationId: organizationId || "",
      data: values,
    });

    if (response.data?.success) {
      toast.success("Subscription Created");
      handleClose();
    } else {
      toast.error("Failed to create subscription");
    }
  };

  return (
    <ReusableForm
      isLoading={isCreatingSubscription}
      show={show}
      title={`Create Subscription for ${organization?.name || ""}`}
      handleClose={handleClose}
      attributes={subscriptionAttributes}
      initialValues={subscriptionInitialValues}
      onSubmit={handleSubscriptionSubmit}
    />
  );
};

export default CreateSubscriptionForm;
