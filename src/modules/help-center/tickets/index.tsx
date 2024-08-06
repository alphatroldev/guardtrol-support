import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetTicketsQuery } from "../../../features/tickets";
import { selectUser } from "../../../redux/slice/authSlice";
import { useGetTicketCategoriessQuery } from "../../../features/ticket-categories";
import socket from "../../../services/sockets";
import { toast } from "react-toastify";
import CustomButton from "../../../components/common/Button";
import { Link } from "react-router-dom";
import { selectUnreadTickets } from "../../../redux/selectors/notification";
import Select from "react-select";
import { useDebouncedValue } from "../../../utils/helpers";

type Prop = {
  handleViewTicket: Function;
};

const HelpCenterTickets = () => {
  const currentUser = useSelector(selectUser);
  const isAdmin = currentUser?.role === "superadmin";
  const unreadTickets = useSelector(selectUnreadTickets);

  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
    search: "",
  });
  const debouncedSearchQuery = useDebouncedValue(filters.search);

  const {
    data: ticketApiResponse,
    refetch: refetchTicket,
    isFetching,
    error,
    isUninitialized,
  } = useGetTicketsQuery({
    ...(filters.limit && { limit: filters.limit }),
    ...(filters.page && { page: filters.page }),
    ...(debouncedSearchQuery && { search: debouncedSearchQuery }),
  });

  useEffect(() => {
    if (!isUninitialized) {
      refetchTicket();
    }
  }, []);
  const options = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];

  const totalPages = ticketApiResponse?.total
    ? Math.ceil(ticketApiResponse?.total / filters.limit)
    : 0;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => setFilters({ ...filters, page: i })}
          className={`page-item ${filters.page === i ? "active" : ""}`}
        >
          <button className="page-link">{i}</button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <div className="card">
        <div className="card-header  pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">Tickets</span>
          </h3>
          <div className="card-toolbar d-flex gap-2">
            <CustomButton
              showLoading={isFetching && !error}
              btnAction={refetchTicket}
              btnText={"Refetch"}
            />
          </div>
        </div>
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
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          search: e.target.value.trim().toLowerCase(),
                        })
                      }
                      placeholder="Search"
                    />
                  </div>
                </form>
                <div className="mb-10">
                  {ticketApiResponse?.total ? (
                    ticketApiResponse?.data?.map((ticket) => (
                      <Link
                        key={ticket._id}
                        style={{ cursor: "pointer", position: "relative" }}
                        className="d-flex mb-10"
                        to={`/help-center/ticket/${ticket._id}`}
                      >
                        <i
                          className={`ki-duotone ki-file-added fs-2x me-5 ms-n1 mt-2 text-${
                            unreadTickets.includes(ticket._id)
                              ? "danger"
                              : "success"
                          }   `}
                        >
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        <div className="d-flex flex-column">
                          <div className="d-flex flex-column align-items-start justify-content-center mb-2">
                            <a className="text-muted text-hover-primary fs-6 me-3 fw-semibold">
                              {ticket?.ticketNumber}
                            </a>

                            <a className="text-dark text-hover-primary fs-4 me-3 fw-semibold">
                              {ticket.subject}
                            </a>
                          </div>
                          {unreadTickets.includes(ticket._id) ? (
                            <div
                              style={{ position: "absolute", top: 0, right: 0 }}
                            >
                              <span className="badge w-2px badge-danger">
                                {" "}
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
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
                      </Link>
                    ))
                  ) : (
                    <div className="d-flex mb-10">
                      <span className="text-muted fw-semibold fs-6">
                        No Tickets
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <Select
              className="react-select-styled"
              classNamePrefix="react-select"
              options={options}
              defaultValue={options.find((opt) => opt.value === filters.limit)}
              onChange={(option) =>
                setFilters({ ...filters, limit: option!.value })
              }
            />
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page - 1 })
                  }
                  className={`page-item ${
                    filters.page === 1 ? "disabled" : ""
                  }`}
                >
                  <button className="page-link" disabled={filters.page === 1}>
                    &laquo;
                  </button>
                </li>
                {renderPageNumbers()}
                <li
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page + 1 })
                  }
                  className={`page-item ${
                    filters.page === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    disabled={filters.page === totalPages}
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenterTickets;
