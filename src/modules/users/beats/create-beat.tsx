import React, { useEffect } from "react";
import * as Yup from "yup";
import ReusableForm from "../../../components/form/ReusableFormModal";
import { Modal } from "react-bootstrap";
import { KTIcon } from "../../../_metronic/helpers";

const beatAttributes = [
  {
    name: "name",
    label: "Beat Name",
    type: "text",
    placeholder: "Enter beat name",
    validation: Yup.string().required("Beat name is required"),
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address",
    validation: Yup.string().required("Address is required"),
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter description",
    validation: Yup.string().required("Description is required"),
  },
  {
    name: "lastseen",
    label: "Last Seen",
    type: "date",
    placeholder: "Pick a date",
    validation: Yup.date().required("Last seen date is required"),
  },
  {
    name: "isactive",
    label: "Is Active",
    type: "checkbox",
    validation: Yup.boolean(),
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
    name: "hasupdate",
    label: "Has Update",
    type: "checkbox",
    validation: Yup.boolean().oneOf([true], "Must be checked to proceed"),
  },
];

const beatInitialValues = {
  name: "",
  address: "",
  description: "",
  lastseen: "",
  isactive: false,
  user: "",
  hasupdate: false,
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
  };

  return (
    <ReusableForm
      show={show}
      handleClose={handleClose}
      attributes={beatAttributes}
      initialValues={beatInitialValues}
      onSubmit={handleBeatSubmit}
    />
  );
};

export default CreateBeatForm;
