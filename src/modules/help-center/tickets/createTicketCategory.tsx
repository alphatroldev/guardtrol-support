import * as Yup from "yup";
import { useSelector } from "react-redux";
import { KTIcon } from "../../../_metronic/helpers";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  useCreateTicketCategoriesMutation,
  useGetTicketCategoriessQuery,
  useUpdateTicketCategoriesMutation,
} from "../../../features/ticket-categories";
import { useGetTicketsQuery } from "../../../features/tickets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
};
const createTicketCategorySchema = Yup.object().shape({
  title: Yup.string().required("Category Title is required"),
});

const CreateTicketCategory = ({
  setCreateTicketCategory,
  refresh,
  ticketCategory,
}: any) => {
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data: fasApiResponse, refetch: refetchFaqs } = useGetTicketsQuery({});
  const { data: fasApiCategoriesResponse, refetch: refetchFaqCategories } =
    useGetTicketCategoriessQuery({});
  const [createTicketCategory] = useCreateTicketCategoriesMutation();
  const [updateTicketCategory] = useUpdateTicketCategoriesMutation();
  const formik = useFormik({
    initialValues: ticketCategory?._id
      ? { title: ticketCategory?.title }
      : initialValues,
    validationSchema: createTicketCategorySchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setIsLoading(true);
      try {
        if (ticketCategory?._id) {
          await updateTicketCategory({
            id: ticketCategory?._id,
            data: values,
          });
          toast("Ticket Category Updated");
        } else {
          await createTicketCategory({ ...values });
          toast("Ticket Category Created");
        }
        if (1) {
          formik.values = initialValues;
          refresh();
        }

        setSubmitting(false);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        setSubmitting(false);
        setIsLoading(false);

        if (error.response?.data.message) {
          return setStatus(error.response.data.message);
        }
        if (error.response?.data.error) {
          return setStatus(error.response.data.error);
        } else {
          return setStatus(error.error);
        }
      } finally {
        navigate("/help-center/tickets");
      }
    },
  });
  return (
    <>
      <div
        className="modal fade show d-block"
        id="kt_modal_add_user"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered mw-650px">
          <div className="modal-content">
            <div className="modal-header pt-7" id="kt_chat_contacts_header">
              <div className="modal-title">
                <h2>
                  {ticketCategory?._id
                    ? "Update ticket category"
                    : "Create ticket category"}
                </h2>
              </div>
              <div
                className="btn btn-icon btn-sm btn-active-icon-primary"
                data-kt-users-modal-action="close"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/help-center/tickets")}
              >
                <KTIcon iconName="cross" className="fs-1" />
              </div>
            </div>
            <div className="modal-body scroll-y mx-5 mx-xl-10 ">
              <div className="card-body"></div>
              <form
                className="form w-100 h-100"
                onSubmit={formik.handleSubmit}
                noValidate
                id="workflow_creation_form"
              >
                <div className="row mb-7 fv-plugins-icon-container">
                  <div className="col-12">
                    <label className="fs-6 fw-semibold form-label mt-3">
                      <span className="required">Title</span>
                      <span
                        className="ms-1"
                        data-bs-toggle="tooltip"
                        aria-label="Enter the category title."
                        data-bs-original-title="Enter the category title."
                        data-kt-initialized="1"
                      >
                        <i className="ki-duotone ki-information fs-7">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                        </i>
                      </span>
                    </label>
                    <input
                      type="text"
                      {...formik.getFieldProps("title")}
                      className="form-control form-control-solid"
                      name="title"
                      placeholder="Category title"
                    />
                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                  </div>
                </div>

                <div className="separator mb-6"></div>
                <div className="d-flex justify-content-end">
                  <button
                    type="reset"
                    data-kt-contacts-type="cancel"
                    className="btn btn-light me-3"
                    onClick={() => navigate("/help-center/tickets")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="kt_sign_in_submit"
                    className="btn btn-primary"
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    <i className="ki-duotone ki-badge fs-2  mx-2">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                      <span className="path4"></span>
                      <span className="path5"></span>
                    </i>
                    {!IsLoading && (
                      <span className="indicator-label">
                        {ticketCategory?._id ? "Update" : "Create"}
                      </span>
                    )}
                    {IsLoading && (
                      <span
                        className="indicator-progress"
                        style={{ display: "block" }}
                      >
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default CreateTicketCategory;
