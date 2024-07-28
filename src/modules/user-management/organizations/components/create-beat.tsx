import React, { useEffect } from "react";
import * as Yup from "yup";
import ReusableForm from "../../../../components/form/ReusableFormModal";
import { useParams } from "react-router-dom";
import { useGetOrganizationByIdQuery } from "../../../../services/organization";
import { useCreateBeatMutation } from "../../../../services/beat";
import { toast } from "react-toastify";

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
];

const beatInitialValues = {
  name: "",
  address: "",
  hasupdate: false,
};
type Props = {
  show: boolean;
  handleClose: () => void;
};

const CreateBeatForm = ({ show, handleClose }: Props) => {
  const { organizationId } = useParams();
  const [createBeat, { isLoading: isCreatingBeat }] = useCreateBeatMutation();

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

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
  };
  const handleBeatSubmit = async (values: any) => {
    const response = await createBeat({
      organizationId: organizationId || "",
      data: values,
    });

    if (response.data?.success) {
      toast.success("Beat Created");
    }
  };

  return (
    <ReusableForm
      isLoading={isCreatingBeat}
      show={show}
      title={`Create Beat for ${organization?.name || ""}`}
      handleClose={handleClose}
      attributes={beatAttributes}
      initialValues={beatInitialValues}
      onSubmit={handleBeatSubmit}
    />
  );
};

export default CreateBeatForm;
