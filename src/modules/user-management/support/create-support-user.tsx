import { FC } from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import ReusableFormModal from "../../../components/form/ReusableFormModal";
import { useCreateSupportUserMutation } from "../../../features/support-users";
import { toast } from "react-toastify";

const attributes = [
  {
    name: "name",
    label: "Support Name",
    type: "text",
    placeholder: "Enter support name",
    validation: Yup.string().required("Support name is required"),
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter support email",
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
    name: "role",
    label: "Role",
    type: "select",
    options: [{ value: "support", label: "Support" }],
    validation: Yup.string().required("Role is required"),
  },
];

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
};

type Props = {
  show: boolean;
  handleClose: () => void;
};

const CreateSupportUser = ({ show, handleClose }: Props) => {
  useEffect(() => {
    initMap();
  }, []);
  const [createSupportUser] = useCreateSupportUserMutation();
  const initMap = () => {};

  const handleSubmit = async (values: any) => {
    const res: any = await createSupportUser(values);

    if (res.data.success) {
      toast("Support user created");
    }
  };
  const handleCancel = (values: any) => {};
  return (
    <ReusableFormModal
      attributes={attributes}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      show={show}
      isLoading={false}
      title="Create Support User"
      handleClose={handleClose}
    />
  );
};

export { CreateSupportUser };
