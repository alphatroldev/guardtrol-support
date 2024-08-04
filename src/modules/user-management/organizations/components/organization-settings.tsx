import { FC, useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dropdown1 } from "../../../../_metronic/partials";
import {
  useGetOrganizationByIdQuery,
  useUpdateOrganizationMutation,
} from "../../../../features/organization";
import ReusableFormModal from "../../../../components/form/ReusableFormModal";
import * as Yup from "yup";
import ReusableForm from "../../../../components/form/ReusableForm";
import { toast } from "react-toastify";

const attributes = [
  {
    name: "name",
    label: "Organization Name",
    type: "text",
    placeholder: "Enter organization name",
    validation: Yup.string().required("Organization name is required"),
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter organization email",
    validation: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
  },

  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address",
    validation: Yup.string().required("Address is required"),
  },

  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter phone number",
    validation: Yup.string().required("Phone number is required"),
  },
  {
    name: "whatsappNumber",
    label: "WhatsApp Number",
    type: "text",
    placeholder: "Enter WhatsApp number",
    validation: Yup.string().required("WhatsApp number is required"),
  },
  {
    name: "profile",
    label: "Profile Image",
    type: "file",
    validation: Yup.mixed().required("Profile image is required"),
  },
];

interface editOrganizationType {
  name: string;
  email: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  profile: null;
}

const OrganizationSettings: FC = () => {
  const { organizationId } = useParams();
  const [organizationData, setOrganizationData] =
    useState<null | editOrganizationType>();

  const [updateOrganization, { isLoading: isUpdatingOrganization }] =
    useUpdateOrganizationMutation();

  const { data: organization, isLoading } = useGetOrganizationByIdQuery(
    organizationId || "",
    {
      skip: organizationId ? false : true,
    }
  );

  const handleSubmit = async (values: any) => {
    const response = await updateOrganization({
      id: organizationId || "",
      data: values,
    });

    if (response.data?.success) {
      console.log(`Organization Updated`);
      toast.success("Organization Updated");
    }
  };

  const handleCancel = (values: any) => {};

  useEffect(() => {
    if (organization) {
      setOrganizationData({
        name: organization?.name || "",
        email: organization?.email || "",
        address: organization?.address || "",
        phone: organization?.phone || "",
        whatsappNumber: organization?.whatsappNumber || "",
        profile: null,
      });
    }
  }, [organization]);
  return (
    <>
      {!isLoading && organizationData && (
        <ReusableForm
          isLoading={isUpdatingOrganization}
          attributes={attributes}
          initialValues={organizationData}
          onSubmit={handleSubmit}
          title="Edit Organization"
          handleCancel={handleCancel}
        />
      )}
    </>
  );
};

export { OrganizationSettings };
