import React, { useEffect } from "react";
import * as Yup from "yup";
import ReusableForm from "../../../../components/form/ReusableFormModal";
import { useParams } from "react-router-dom";
import { useGetOrganizationByIdQuery } from "../../../../services/organization";
import { useCreateSubscriptionMutation } from "../../../../services/subscription";
import { toast } from "react-toastify";

const today = new Date();
const subscriptionAttributes = [
  {
    name: "plan",
    label: "Subscription Plan",
    type: "text",
    placeholder: "Enter subscription plan",
    validation: Yup.string().required("Subscription plan is required"),
  },
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
    name: "totalamount",
    label: "Total Amount",
    type: "number",
    placeholder: "Enter total amount",
    validation: Yup.number().required("Total amount is required").min(0),
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
  {
    name: "expiresat",
    label: "End Date",
    type: "date",
    placeholder: "End date will be calculated based on duration",
    validation: Yup.date().when("startsAt", (startsAt, schema) => {
      return startsAt
        ? schema.min(
            new Date(
              new Date(startsAt as any).getTime() + 7 * 24 * 60 * 60 * 1000
            ),
            "End date must be at least 7 days after the start date"
          )
        : schema;
    }),
  },
];

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
