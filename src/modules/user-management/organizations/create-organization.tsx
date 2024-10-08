import { FC } from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import ReusableFormModal from "../../../components/form/ReusableFormModal";
import { useCreateOrganizationMutation } from "../../../features/organization";
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
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    validation: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address",
    validation: Yup.string().required("Address is required"),
  },
  // {
  //   name: "isOwner",
  //   label: "Is Owner",
  //   type: "checkbox",
  //   validation: Yup.boolean().oneOf([true], "Must be checked to proceed"),
  // },
  // {
  //   name: "roles",
  //   label: "Roles",
  //   type: "select",
  //   options: [
  //     { value: "admin", label: "Admin" },
  //     { value: "user", label: "User" },
  //   ],
  //   validation: Yup.array()
  //     .of(Yup.string().required("Role is required"))
  //     .required("At least one role is required"),
  // },
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
  // {
  //   name: "image",
  //   label: "Profile Image",
  //   type: "file",
  //   validation: Yup.mixed().required("Profile image is required"),
  // },
  // {
  //   name: "onboardingcomplete",
  //   label: "Onboarding Complete",
  //   type: "checkbox",
  //   validation: Yup.boolean().oneOf([true], "Must be checked to proceed"),
  // },
];

const initialValues = {
  name: "",
  email: "",
  password: "",
  address: "",
  isOwner: false,
  roles: [],
  phone: "",
  whatsappNumber: "",
  image: null,
  onboardingcomplete: false,
};
type Props = {
  show: boolean;
  handleClose: () => void;
};

const CreateOrganization = ({ show, handleClose }: Props) => {
  useEffect(() => {
    initMap();
  }, []);

  const [createOrganization] = useCreateOrganizationMutation();
  const initMap = () => {};

  const handleSubmit = async (values: any) => {
    const res = await createOrganization(values);
    if (res) {
      toast("Organization has been created");
    }
    // console.log("Form values:", values);
  };
  const handleCancel = (values: any) => {
    console.log("Form values:", values);
  };
  return (
    <ReusableFormModal
      attributes={attributes}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      show={show}
      isLoading={false}
      title="Create Organization"
      handleClose={handleClose}
    />
  );
};

export { CreateOrganization };
