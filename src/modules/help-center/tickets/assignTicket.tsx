import * as Yup from "yup";
import { useSelector } from "react-redux";
import { KTIcon } from "../../../_metronic/helpers";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IUser } from "../../../types/auth";
import { useAssignTicketByIdMutation } from "../../../features/tickets";
import { useGetSupportUsersQuery } from "../../../features/support-users";
import { toast } from "react-toastify";

const initialValues = {
  ticketId: "",
  user: "",
};
const assignTicketSchema = Yup.object().shape({
  user: Yup.string().required("User is required"),
});

const AssignTicket = ({ setAssignTicket, ticket }: any) => {
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [assignTicket] = useAssignTicketByIdMutation();
  const [admins, setadmins] = useState<Array<IUser>>();

  const {
    data: supportUsersApiResponse,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useGetSupportUsersQuery({
    notPaginate: true,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: assignTicketSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setIsLoading(true);
      try {
        const res: any = await assignTicket({
          body: { assignTo: values.user },
          ticket: ticket._id,
        });
        console.log(res);
        if (res.data.status === "success") {
          toast("Ticket assigned");
          setAssignTicket(false);
          formik.values = initialValues;
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
      }
    },
  });
  console.log(ticket);
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
                  Assign support request to:{" "}
                  <span className="text-muted">...</span>
                </h2>
              </div>
              <div
                className="btn btn-icon btn-sm btn-active-icon-primary"
                data-kt-users-modal-action="close"
                style={{ cursor: "pointer" }}
                onClick={() => setAssignTicket(null)}
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
                      <span className="required">Select user</span>
                      <span
                        className="ms-1"
                        data-bs-toggle="tooltip"
                        aria-label="Select User to assign"
                        data-bs-original-title="Select User to assign"
                        data-kt-initialized="1"
                      >
                        <i className="ki-duotone ki-information fs-7">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                        </i>
                      </span>
                    </label>
                    <select
                      {...formik.getFieldProps("user")}
                      className="form-select form-select-solid select2-hidden-accessible"
                    >
                      <option value="" selected>
                        Select User
                      </option>
                      {supportUsersApiResponse?.data
                        .filter(
                          (supportUser) =>
                            supportUser?._id !== ticket?.assignedTo?._id
                        )
                        .map((user) => (
                          <option value={user._id}>{user.name}</option>
                        ))}
                    </select>
                    {formik.touched.user && formik.errors.user && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.user}
                        </div>
                      </div>
                    )}
                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                  </div>
                </div>

                <div className="separator mb-6"></div>
                <div className="d-flex justify-content-end">
                  <button
                    type="reset"
                    data-kt-contacts-type="cancel"
                    className="btn btn-light me-3"
                    onClick={() => setAssignTicket(null)}
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
                      <span className="indicator-label">Assign</span>
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

export default AssignTicket;
