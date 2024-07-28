import React, { useEffect } from "react";
import * as Yup from "yup";
import ReusableForm from "../../../../components/form/ReusableFormModal";
import { Modal } from "react-bootstrap";
import { KTIcon } from "../../../../_metronic/helpers";
import { useParams } from "react-router-dom";
import { useGetOrganizationByIdQuery } from "../../../../services/organization";
import { useCreateGuardMutation } from "../../../../services/guard";
import { toast } from "react-toastify";

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
];

const guardInitialValues = {
  name: "",
  phone: "",
};
type Props = {
  show: boolean;
  handleClose: () => void;
};

const CreateGuardForm = ({ show, handleClose }: Props) => {
  const { organizationId } = useParams();

  const [createGuard, { isLoading: isCreatingGuard }] =
    useCreateGuardMutation();

  const { data: organization, isLoading } = useGetOrganizationByIdQuery(
    organizationId || "",
    {
      skip: organizationId ? false : true,
    }
  );
  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {};

  const handleGuardSubmit = async (values: any) => {
    const response = await createGuard({
      organizationId: organizationId || "",
      data: values,
    });

    if (response.data?.success) {
      toast.success("Guard Created");
    }
  };

  return (
    <ReusableForm
      title="Create Guard"
      show={show}
      isLoading={isCreatingGuard}
      handleClose={handleClose}
      attributes={guardAttributes}
      initialValues={guardInitialValues}
      onSubmit={handleGuardSubmit}
    />
  );
};

export default CreateGuardForm;
