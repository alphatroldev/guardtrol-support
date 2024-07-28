import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "flatpickr/dist/themes/material_green.css";
import DatePicker from "./DatePicker";
import CustomSelect from "./Select";
import ErrorMessage from "./ErrorMessage";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Switch from "./Switch";
import Input from "./inputs";
import { Modal, Spinner } from "react-bootstrap";
import { KTIcon } from "../../_metronic/helpers";
import { error } from "console";

interface Attribute {
  name: string;
  label: string;
  type: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  validation?: Yup.AnySchema;
}

interface ReusableFormProps {
  attributes: Attribute[];
  initialValues: { [key: string]: any };
  onSubmit: (values: any) => void;
  show: boolean;
  isLoading?: boolean;
  title: string;
  handleClose: () => void;
}

const ReusableFormModal: React.FC<ReusableFormProps> = ({
  attributes,
  initialValues,
  onSubmit,
  show,
  title,
  isLoading,
  handleClose,
}) => {
  const validationSchema = Yup.object(
    attributes.reduce((acc, attr) => {
      if (attr.validation) {
        acc[attr.name] = attr.validation;
      }
      return acc;
    }, {} as { [key: string]: Yup.AnySchema })
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // const formData = new FormData();

      // for (const key in values) {
      //   if (values[key] instanceof FileList) {
      //     for (let i = 0; i < values[key].length; i++) {
      //       formData.append(key, values[key][i]);
      //     }
      //   } else {
      //     formData.append(key, values[key]);
      //   }
      // }

      await onSubmit(values);
      formik.resetForm();
      handleClose();
    },
  });

  const renderField = (attribute: Attribute) => {
    switch (attribute.type) {
      case "text":
      case "email":
      case "password":
        return (
          <>
            <Input
              key={attribute.name}
              id={attribute.name}
              label={attribute.label}
              type={attribute.type}
              placeholder={attribute.placeholder || ""}
              value={formik.values[attribute.name]}
              onChange={formik.handleChange}
              required={
                !!attribute.validation?.tests.find(
                  (test: any) => test.OPTIONS.name === "required"
                )
              }
            />
            {formik.errors[attribute.name] && (
              <ErrorMessage message={formik.errors[attribute.name]} />
            )}
          </>
        );
      case "number":
        return (
          <>
            <Input
              key={attribute.name}
              id={attribute.name}
              label={attribute.label}
              type={attribute.type}
              placeholder={attribute.placeholder || ""}
              value={formik.values[attribute.name]}
              onChange={formik.handleChange}
              required={
                !!attribute.validation?.tests.find(
                  (test: any) => test.OPTIONS.name === "required"
                )
              }
            />
            {formik.errors[attribute.name] && (
              <ErrorMessage message={formik.errors[attribute.name]} />
            )}
          </>
        );
      case "date":
        return (
          <DatePicker
            key={attribute.name}
            label={attribute.label}
            value={formik.values[attribute.name]}
            onChange={(date: Date) =>
              formik.setFieldValue(attribute.name, date)
            }
          />
        );
      case "select":
        return (
          <CustomSelect
            key={attribute.name}
            label={attribute.label}
            options={attribute.options || []}
            value={formik.values[attribute.name]}
            onChange={(option: any) =>
              formik.setFieldValue(attribute.name, option)
            }
          />
        );
      case "checkbox":
        return (
          <>
            <label className={`form-label `}>{attribute.label}</label>
            <Checkbox
              key={attribute.name}
              id={attribute.name}
              label={attribute.label}
              checked={formik.values[attribute.name]}
              onChange={formik.handleChange}
            />
          </>
        );
      case "radio":
        return (
          <div key={attribute.name} className="row fw-row">
            <label className={`form-label `}>{attribute.label}</label>
            {attribute.options?.map((option) => (
              <div className="col-4">
                <Radio
                  key={option.value}
                  id={`${attribute.name}-${option.value}`}
                  label={option.label}
                  checked={formik.values[attribute.name] === option.value}
                  onChange={() =>
                    formik.setFieldValue(attribute.name, option.value)
                  }
                />
              </div>
            ))}
          </div>
        );
      case "file":
        return (
          <div className="mb-10" key={attribute.name}>
            <label className="form-label required" htmlFor={attribute.name}>
              {attribute.label}
            </label>
            <input
              id={attribute.name}
              type="file"
              className="form-control form-control-solid"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files ? event.target.files[0] : null;
                formik.setFieldValue(attribute.name, file);
              }}
            />
          </div>
        );
      case "switch":
        return (
          <>
            <label className="form-label required" htmlFor={attribute.name}>
              {attribute.label}
            </label>
            <Switch
              key={attribute.name}
              id={attribute.name}
              label={attribute.label}
              checked={formik.values[attribute.name]}
              onChange={formik.handleChange}
            />
          </>
        );
      default:
        return null;
    }
  };
  const handleReset = () => {
    formik.resetForm();
    handleClose();
  };

  console.log(formik.errors);
  return (
    <Modal
      className="modal fade"
      data-backdrop="static"
      tabIndex={-1}
      role="dialog"
      show={show}
      dialogClassName="modal-lg"
      aria-hidden="true"
      onHide={handleClose}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>

          <div
            className="btn btn-icon btn-sm btn-active-light-primary ms-2"
            onClick={handleClose}
          >
            <KTIcon iconName="cross" className="fs-2x" />
          </div>
        </div>
        <div className="modal-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="row " style={{ rowGap: "10px" }}>
              {attributes.map((attribute) => (
                <div className="col-6">{renderField(attribute)}</div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light-primary"
                onClick={handleReset}
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-primary"
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" className="" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ReusableFormModal;
