import React, { useEffect } from "react";
import * as Yup from "yup";
import ReusableForm from "../../components/form/ReusableFormModal";
import { useParams } from "react-router-dom";
import {
  useGetOrganizationByIdQuery,
  useGetOrganizationsQuery,
} from "../../services/organization";
import { useCreateSubscriptionMutation } from "../../services/subscription";
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

const CreateFreeTrialSubscriptionForm = ({ show, handleClose }: Props) => {
  const { organizationId } = useParams();
  const [createSubscription, { isLoading: isCreatingSubscription }] =
    useCreateSubscriptionMutation();

  const {
    data: organizationApiResponse,
    error,
    refetch,
    isFetching,
    isUninitialized,
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
          ? organizationApiResponse?.data
              .filter((org) => org.subscriptions?.length === 0 && org.isOwner)
              .map((e) => {
                return { value: e._id, label: e.name };
              })
          : []),
      ],
    },
    {
      name: "duration",
      label: "Duration",
      type: "select",
      validation: Yup.string().required("Duration is required"),
      options: [
        {
          value: "7",
          label: "7 Days",
        },
        {
          value: "14",
          label: "14 Days",
        },
        {
          value: "30",
          label: "30 Days",
        },
      ],
    },
    {
      name: "startsAt",
      label: "Start Date",
      type: "date",
      placeholder: "Select start date",
      validation: Yup.date()
        .required("Start date is required")
        .min(today, "Start date must be in the future"),
    },
  ];

  const { data: organization, isLoading } = useGetOrganizationByIdQuery(
    organizationId || "",
    {
      skip: !organizationId,
    }
  );
  console.log(
    organizationApiResponse?.data.filter(
      (org) => org.subscriptions?.length === 0 && org.isOwner
    )
  );
  useEffect(() => {
    if (!isUninitialized) {
      refetch();
    }
    initMap();
  }, []);

  const initMap = () => {};

  const handleSubscriptionSubmit = async (values: any) => {
    // Calculate the expiration date based on the duration
    const durationInDays = parseInt(values.duration, 10);
    const startsAt = new Date(values.startsAt);
    const expiresAt = new Date(startsAt);
    expiresAt.setDate(startsAt.getDate() + durationInDays);

    // Prepare the payload for submission
    const payload = {
      ...values,
      plan: "free trial",
      expiresat: expiresAt,
      totalamount: 0, // Implement this function based on your logic
      paymentstatus: "pending", // Default payment status
      paymentgateway: "", // Default payment gateway if not provided
      transactionid: generateTransactionId(), // Implement this function to generate a transaction ID
    };

    const response = await createSubscription({
      organizationId: values.organization || "",
      data: payload,
    });

    if (response.data?.success) {
      toast.success("Subscription Created");
      handleClose();
    } else {
      toast.error("Failed to create subscription");
    }
  };

  // const calculateTotalAmount = (plan) => {
  //   // Implement your logic to calculate the total amount based on the plan
  //   return 100; // Placeholder amount
  // };

  const generateTransactionId = () => {
    // Implement your logic to generate a unique transaction ID
    return `txn_${Date.now()}`;
  };

  return (
    <ReusableForm
      isLoading={isCreatingSubscription}
      show={show}
      title={`Create Free Trial Subscription`}
      handleClose={handleClose}
      attributes={subscriptionAttributes}
      initialValues={subscriptionInitialValues}
      onSubmit={handleSubscriptionSubmit}
    />
  );
};

export default CreateFreeTrialSubscriptionForm;
