import React, { useEffect } from "react";
import * as Yup from "yup";
import ReusableForm from "../../../components/form/ReusableFormModal";
import { Modal } from "react-bootstrap";
import { KTIcon } from "../../../_metronic/helpers";

const guardAttributes = [
  {
    name: "name",
    label: "Guard Name",
    type: "text",
    placeholder: "Enter guard name",
    validation: Yup.string().required("Guard name is required"),
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter phone number",
    validation: Yup.string().required("Phone number is required"),
  },
  {
    name: "isactive",
    label: "Is Active",
    type: "checkbox",
    validation: Yup.boolean(),
  },
  {
    name: "status",
    label: "Status",
    type: "text",
    placeholder: "Enter status",
    validation: Yup.string().required("Status is required"),
  },
  {
    name: "profileImage",
    label: "Profile Image",
    type: "file",
    validation: Yup.mixed().required("Profile image is required"),
  },
  {
    name: "user",
    label: "User",
    type: "select",
    options: [
      { value: "user1", label: "User 1" },
      { value: "user2", label: "User 2" },
    ],
    validation: Yup.string().required("User is required"),
  },
  {
    name: "beat",
    label: "Beat",
    type: "select",
    options: [
      { value: "beat1", label: "Beat 1" },
      { value: "beat2", label: "Beat 2" },
    ],
    validation: Yup.string().required("Beat is required"),
  },
];

const guardInitialValues = {
  name: "",
  phone: "",
  isactive: false,
  status: "off duty",
  profileImage: null,
  user: "",
  beat: "",
};
type Props = {
  show: boolean;
  handleClose: () => void;
};

const CreateBeatForm = ({ show, handleClose }: Props) => {
  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {};

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
  };
  const handleBeatSubmit = (values: any) => {
    console.log("Beat form values:", values);
    // Add logic to submit form values to the server
  };

  return (
    <ReusableForm
      show={show}
      handleClose={handleClose}
      attributes={guardAttributes}
      initialValues={guardInitialValues}
      onSubmit={handleBeatSubmit}
    />
  );
};

export default CreateBeatForm;
