import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import * as Yup from "yup";
import { useFormik } from "formik";
import AssignTicket from "./assignTicket";
import { ITicket } from "../../../types/ticket";
import {
  useCreateTicketResponseMutation,
  useGetTicketResponsesQuery,
} from "../../../features/tickets-response";
import { KTIcon } from "../../../_metronic/helpers";
import {
  useDeleteTicketMutation,
  useGetTicketByIdQuery,
  useGetTicketsQuery,
} from "../../../features/tickets";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import * as swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../../services/sockets";
import { selectUser } from "../../../redux/slice/authSlice";
import { selectUnreadTickets } from "../../../redux/selectors/notification";
import { removeNotification } from "../../../redux/slice/notificationSlice";
import { useDispatch } from "react-redux";

const MySwal = withReactContent(swal.default);

type Props = { ticket?: ITicket; setPage: Function };

const initialValues = {
  message: "",
  status: "",
};
const ticketResponseSchema = Yup.object().shape({
  message: Yup.string().required("Message is required"),
  status: Yup.string().required("Status is required"),
});

const Ticket = () => {
  const { ticketId } = useParams();
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [assignTicket, setAssignTitcket] = useState<
    "new" | "close" | boolean
  >();
  const navigate = useNavigate();
  const [sendResponse] = useCreateTicketResponseMutation();
  const {
    data: ticketApiResponses,
    refetch: refetchTicketResponses,
    isUninitialized,
  } = useGetTicketResponsesQuery({ ticket: ticketId || "" });
  const unreadTickets = useSelector(selectUnreadTickets);

  const {
    data: ticketApiResponse,
    refetch: refetchTicket,
    isUninitialized: isUninitializedFetchTicket,
  } = useGetTicketByIdQuery(ticketId || "");

  useEffect(() => {
    if (ticketId && unreadTickets.includes(ticketId)) {
      dispatch(removeNotification(ticketId));
    }
  }, [unreadTickets]);
  const { refetch: refetchTickets } = useGetTicketsQuery({});

  const [deleteTicket] = useDeleteTicketMutation();

  const formik = useFormik({
    initialValues,
    validationSchema: ticketResponseSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setIsLoading(true);
      try {
        if (!ticketApiResponse) return;
        await sendResponse({ ...values, ticket: ticketId });
        formik.resetForm();
        await refetchTicketResponses();
        toast("Your response has been sent");
        await refetchTickets();

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

  const handleDelete = (ticket: ITicket) => {
    console.log(ticket);
    MySwal.fire({
      title: "Are you sure, you want to delete this document?",
      text: `Ticket title: ${ticket.subject}`,
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Yes Delete!",
      showCancelButton: true,
      heightAuto: false,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
    }).then((result: any) => {
      if (result.isConfirmed) {
        deleteTicket(ticket._id || "").then((res) => {
          if (res?.data) {
            // setPage("tickets");
            toast("Ticket has been deleted");
          }
          // else {
          //   MySwal.fire({
          //     title: 'Error',
          //     text: res?.error,
          //     icon: 'error',
          //     confirmButtonText: 'Close!',
          //     customClass: {
          //       confirmButton: 'btn btn-danger',
          //     },
          //   })
          // }
        });
      }
    });
  };

  useEffect(() => {
    if (!isUninitialized) {
      refetchTicketResponses();
    }
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">Ticket</span>
          </h3>
          <div className="card-toolbar">
            <button
              type="button"
              onClick={() =>
                ticketApiResponse && handleDelete(ticketApiResponse)
              }
              className="btn btn-sm btn-icon btn-color-danger btn-active-light-danger mb-2"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
              title="Delete"
            >
              <KTIcon iconName="trash" className="fs-2" />
            </button>
            <button
              type="button"
              onClick={() => setAssignTitcket(true)}
              className="btn btn-primary mr-5 fw-bold fs-8 fs-lg-base"
            >
              <span className="indicator-label">
                {ticketApiResponse?.assignedTo ? "Re-assign To" : "Assign To"}
              </span>
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex flex-column flex-xl-row p-7">
            <div
              style={{ position: "relative" }}
              className="flex-lg-row-fluid me-xl-15 mb-20 mb-xl-0"
            >
              <div className="mb-0">
                <div className="d-flex align-items-center mb-12">
                  <i className="ki-duotone ki-file-added fs-4qx text-success ms-n2 me-3">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <h1 className="text-gray-800 fw-semibold">
                        {ticketApiResponse?.subject}
                      </h1>
                      <span className="badge d-flex badge-light-warning my-1 d-block">
                        {ticketApiResponse?.status}
                      </span>
                    </div>
                    <div className="">
                      <span className="fw-semibold text-muted me-6">
                        Ticket Number:{" "}
                        <span className="text-hover-primary">
                          {ticketApiResponse?.ticketNumber}
                        </span>
                      </span>
                      <span className="fw-semibold text-muted me-6">
                        Category:{" "}
                        <a href="#" className="text-muted text-hover-primary">
                          {ticketApiResponse?.category?.title}
                        </a>
                      </span>
                      <span className="fw-semibold text-muted me-6">
                        By:{" "}
                        <a href="#" className="text-muted text-hover-primary">
                          {ticketApiResponse?.author?.name}
                        </a>
                      </span>
                      {ticketApiResponse?.assignedTo && (
                        <span className="fw-semibold text-muted me-6">
                          Assigned to:{" "}
                          <a href="#" className="text-muted text-hover-primary">
                            {ticketApiResponse?.assignedTo?.name}
                          </a>
                        </span>
                      )}
                      <span className="fw-semibold text-muted">
                        Created:{" "}
                        <span className="fw-bold text-gray-600 me-1">
                          {ticketApiResponse?.createdAt
                            ? formatDistanceToNow(
                                new Date(ticketApiResponse.createdAt),
                                {
                                  addSuffix: true,
                                }
                              )
                            : ""}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-15" data-select2-id="select2-data-140-7rzi">
                  <div className="mb-15 fs-5 fw-normal text-gray-800">
                    <div className="mb-10 text-capitalize">
                      {ticketApiResponse?.description}
                    </div>
                    {ticketApiResponse?.status !== "Closed" &&
                      ticketApiResponse?.status !== "Resolved" && (
                        <form onSubmit={formik.handleSubmit}>
                          <div className="row mb-7">
                            <div
                              className="col-sm-3 fv-row mb-3"
                              data-select2-id="select2-data-155-jmvd"
                            >
                              <label className="fs-6 fw-semibold mb-2">
                                Status
                              </label>
                              <select
                                {...formik.getFieldProps("status")}
                                className="form-select form-select-solid select2-hidden-accessible"
                              >
                                <option value="" selected>
                                  Select Status
                                </option>
                                <option value="Open">Open</option>
                                <option value="Pending">Pending</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                              </select>
                              {formik.touched.status &&
                                formik.errors.status && (
                                  <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                      <span role="alert">
                                        {formik.errors.status}
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="mb-0">
                            <textarea
                              className="form-control form-control-solid placeholder-gray-600 fs-4 ps-9 pt-7"
                              rows={6}
                              {...formik.getFieldProps("message")}
                              placeholder="Send Response"
                            ></textarea>
                            {formik.touched.message &&
                              formik.errors.message && (
                                <div className="fv-plugins-message-container">
                                  <div className="fv-help-block">
                                    <span role="alert">
                                      {formik.errors.message}
                                    </span>
                                  </div>
                                </div>
                              )}
                            <div className="d-flex justify-content-end">
                              <button
                                type="submit"
                                id="kt_sign_in_submit"
                                className="btn btn-primary mt-5"
                                disabled={
                                  formik.isSubmitting || !formik.isValid
                                }
                              >
                                {!IsLoading && (
                                  <span className="indicator-label">Send </span>
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
                          </div>{" "}
                        </form>
                      )}
                    <div className="mb-9">
                      <h1 className="text-gray-800 fw-semibold mb-10">
                        Responses
                      </h1>
                      {[...(ticketApiResponses?.data || [])]
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )
                        .map((ticketsResponse) => (
                          <div
                            key={ticketsResponse?._id}
                            className="card card-bordered w-100 mb-10"
                          >
                            <div className="card-body">
                              <div className="w-100 d-flex flex-stack mb-8">
                                <div className="d-flex align-items-center f">
                                  <div className="symbol symbol-50px me-5">
                                    <div className="symbol-label fs-1 fw-bold bg-light-success text-success">
                                      {ticketsResponse?.author?.name?.[0]}
                                    </div>
                                  </div>
                                  <div className="d-flex flex-column fw-semibold fs-5 text-gray-600 text-dark">
                                    <div className="d-flex align-items-center">
                                      <a className="text-gray-800 fw-bold text-hover-primary fs-5 me-3">
                                        {ticketsResponse?.author?.name}
                                      </a>
                                      {ticketApiResponse?.author?._id ===
                                        ticketsResponse?.author?._id && (
                                        <span className="badge badge-light-danger">
                                          Author
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-muted fw-semibold fs-6">
                                      {formatDistanceToNow(
                                        new Date(ticketsResponse?.createdAt),
                                        {
                                          addSuffix: true,
                                        }
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="fw-normal fs-5 text-gray-700 m-0">
                                {ticketsResponse?.message}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* <ul className='pagination'>
                <li className='page-item previous disabled'>
                  <a href='#' className='page-link'>
                    <i className='previous'></i>
                  </a>
                </li>
                <li className='page-item'>
                  <a href='#' className='page-link'>
                    1
                  </a>
                </li>
                <li className='page-item active'>
                  <a href='#' className='page-link'>
                    2
                  </a>
                </li>
                <li className='page-item'>
                  <a href='#' className='page-link'>
                    3
                  </a>
                </li>
                <li className='page-item'>
                  <a href='#' className='page-link'>
                    4
                  </a>
                </li>
                <li className='page-item'>
                  <a href='#' className='page-link'>
                    5
                  </a>
                </li>
                <li className='page-item'>
                  <a href='#' className='page-link'>
                    6
                  </a>
                </li>
                <li className='page-item next'>
                  <a href='#' className='page-link'>
                    <i className='next'></i>
                  </a>
                </li>
              </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {assignTicket && (
        <AssignTicket
          ticket={ticketApiResponse}
          setAssignTicket={setAssignTitcket}
        />
      )}
    </>
  );
};

export default Ticket;
