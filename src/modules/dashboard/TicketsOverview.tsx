import React from "react";
import { KTIcon } from "../../_metronic/helpers";
import { useGetTicketsQuery } from "../../features/tickets";
import { formatDateTime } from "../../utils/dateUtils";
import { Link } from "react-router-dom";
const statusMap: any = {
  closed: "danger",
  resolved: "success",
  pending: "warning",
};
const TicketsOverview = () => {
  const {
    data: ticketApiResponse,
    refetch: refetchTicket,
    isFetching,
    error,
    isUninitialized,
  } = useGetTicketsQuery({ limit: 6 });
  return (
    <div className={`card`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Recent Tickets</span>
          <span className="text-muted mt-1 fw-semibold fs-7"></span>
        </h3>
        <div className="card-toolbar"></div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table align-middle gs-0 gy-3">
            {/* begin::Table head */}
            <thead>
              <tr>
                <th className="p-0 min-w-150px"></th>
                <th className="p-0 min-w-140px"></th>
                <th className="p-0 min-w-120px"></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {ticketApiResponse?.total ? (
                ticketApiResponse?.data?.map((ticket) => (
                  <tr>
                    <td>
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                      >
                        {ticket.subject}
                      </a>
                      <span className="text-muted fw-semibold d-block fs-7">
                        {ticket?.assignedTo ? (
                          <>
                            Assigned to:{" "}
                            {ticket?.assignedTo?.name || "Unassigned"}
                          </>
                        ) : (
                          ""
                        )}
                      </span>
                    </td>
                    <td className="text-end">
                      <span className="text-muted fw-semibold d-block fs-8">
                        Created
                      </span>
                      <span className="text-gray-900 fw-bold d-block fs-7">
                        {ticket?.createdAt && formatDateTime(ticket?.createdAt)}
                      </span>
                    </td>
                    <td className="text-end">
                      <span
                        className={`badge badge-light-${
                          statusMap?.[ticket?.status?.toLowerCase()] ||
                          "primary"
                        }  fs-7 fw-bold`}
                      >
                        {ticket?.status || "Pending"}
                      </span>
                    </td>
                    <td className="text-end">
                      <Link
                        to={`/help-center/ticket/${ticket._id}`}
                        className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                      >
                        <i className="bi bi-arrow-right fs-5"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="d-flex mb-10">
                  <span className="text-muted fw-semibold fs-6">
                    No Tickets
                  </span>
                </div>
              )}
            </tbody>
            {/* end::Table body */}
          </table>
        </div>
      </div>
      {/* end::Body */}
    </div>
  );
};

export { TicketsOverview };
