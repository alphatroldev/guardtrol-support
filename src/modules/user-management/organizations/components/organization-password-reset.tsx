import { FC, useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dropdown1 } from "../../../../_metronic/partials";
import { CreateOrganization } from "../create-organization";
import {
  useGetOrganizationByIdQuery,
  useResetOrganizationPasswordMutation,
  useUpdateOrganizationMutation,
} from "../../../../services/organization";
import ReusableFormModal from "../../../../components/form/ReusableFormModal";
import * as Yup from "yup";
import ReusableForm from "../../../../components/form/ReusableForm";
import { toast } from "react-toastify";

const attributes = [
  {
    name: "newPassword",
    label: "New Password",
    type: "text",
    placeholder: "Enter New Password",
    validation: Yup.string()
      .min(8, "New Password must have minimum of 8 characters")
      .required("New Password is required"),
  },
  {
    name: "confirmNewPassword",
    label: "Confirm New Password",
    type: "text",
    placeholder: "Enter New Password",
    validation: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Password confirmation is required"),
  },
];

interface resetOrganizationPasswordType {
  newPassword: string;
  confirmNewPassword: string;
}

const initialValues = { newPassword: "", confirmNewPassword: "" };

const ResetOrganizationPassword: FC = () => {
  const { organizationId } = useParams();
  const [organizationData, setOrganizationData] =
    useState<null | resetOrganizationPasswordType>();

  const [updateOrganization, { isLoading: isUpdatingOrganization }] =
    useResetOrganizationPasswordMutation();

  const handleSubmit = async (values: any) => {
    const response = await updateOrganization({
      id: organizationId || "",
      data: values,
    });

    if (response.data?.success) {
      toast.success("Password reset successful");
    }
  };

  const handleCancel = (values: any) => {};

  return (
    <>
      <ReusableForm
        isLoading={isUpdatingOrganization}
        attributes={attributes}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        title="Reset Password"
        handleCancel={handleCancel}
      />
    </>
  );
};

export { ResetOrganizationPassword };
