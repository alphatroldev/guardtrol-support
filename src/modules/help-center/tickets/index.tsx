import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetTicketsQuery } from "../../../features/tickets";
import { selectUser } from "../../../redux/slice/authSlice";
import { useGetTicketCategoriessQuery } from "../../../features/ticket-categories";
import socket from "../../../services/sockets";
import { toast } from "react-toastify";

type Prop = {
  handleViewTicket: Function;
};
const HelpCenterTickets = ({ handleViewTicket }: Prop) => {
  const currentUser = useSelector(selectUser);
  const isAdmin = currentUser?.role === "superadmin";

  const {
    data: ticketApiResponse,
    refetch: refetchTicket,
    isUninitialized,
  } = useGetTicketsQuery({});

  useEffect(() => {
    if (!isUninitialized) {
      refetchTicket();
    }
  }, []);
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column flex-xl-row p-7">
            <div className="flex-lg-row-fluid me-xl-15 mb-20 mb-xl-0">
              <div className="mb-0">
                <form method="post" action="#" className="form mb-15">
                  <div className="position-relative">
                    <i className="ki-duotone ki-magnifier fs-1 text-primary position-absolute top-50 translate-middle ms-9">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                    <input
                      type="text"
                      className="form-control form-control-lg form-control-solid ps-14"
                      name="search"
                      placeholder="Search"
                    />
                  </div>
                </form>
                <h1 className="text-dark mb-10">{"Tickets"}</h1>
                <div className="mb-10">
                  {ticketApiResponse?.total ? (
                    ticketApiResponse?.data?.map((ticket) => (
                      <div
                        key={ticket._id}
                        style={{ cursor: "pointer" }}
                        className="d-flex mb-10"
                        onClick={() => handleViewTicket(ticket)}
                      >
                        <i className="ki-duotone ki-file-added fs-2x me-5 ms-n1 mt-2 text-success">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        <div className="d-flex flex-column">
                          <div className="d-flex align-items-center mb-2">
                            <a className="text-dark text-hover-primary fs-4 me-3 fw-semibold">
                              {ticket.subject}
                            </a>
                            <span className="badge badge-light-warning my-1">
                              {ticket?.status || "Pending"}
                            </span>
                          </div>
                          <span className="text-muted  fw-semibold fs-6">
                            {ticket?.assignedTo ? (
                              <>
                                Assigned to:{" "}
                                {ticket?.assignedTo?.name || "Unassigned"}
                              </>
                            ) : (
                              ""
                            )}
                          </span>
                          <span className="text-muted fw-semibold fs-6">
                            {ticket.description}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="d-flex mb-10">
                      <span className="text-muted fw-semibold fs-6">
                        You have not made any request
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenterTickets;
