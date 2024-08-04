import { FC } from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { KTIcon } from "../../../_metronic/helpers";
import Input from "../../../components/form/inputs";
import DatePicker from "../../../components/form/DatePicker";
import CustomSelect from "../../../components/form/Select";
import Checkbox from "../../../components/form/Checkbox";
import Radio from "../../../components/form/Radio";
import Switch from "../../../components/form/Switch";
import ReusableForm from "../../../components/form/ReusableForm";
import * as Yup from "yup";
import ReusableFormModal from "../../../components/form/ReusableFormModal";

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
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address",
    validation: Yup.string().required("Address is required"),
  },

  {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" },
    ],
    validation: Yup.array()
      .of(Yup.string().required("Role is required"))
      .required("At least one role is required"),
  },
];

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: [],
  phone: "",
  whatsappNumber: "",
  image: null,
  onboardingcomplete: false,
};

type Props = {
  show: boolean;
  handleClose: () => void;
};

const EditSupportUser = ({ show, handleClose }: Props) => {
  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {};

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
  };

  const handleCancel = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <ReusableFormModal
      isLoading={false}
      attributes={attributes}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      show={show}
      title="Edit User"
      handleClose={handleClose}
    />
  );
};

export { EditSupportUser };
