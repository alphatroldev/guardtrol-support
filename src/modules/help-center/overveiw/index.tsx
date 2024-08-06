import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slice/authSlice";
import { IFaq } from "../../../types/faq";
import { useGetTicketsQuery } from "../../../features/tickets";
import { useGetFaqsQuery } from "../../../features/faq";
import { useGetFaqCategoriesQuery } from "../../../features/faq-categories";
import { useNavigate } from "react-router-dom";

type Props = {
  setPage: Function;
};

const HelpCenterOverview = () => {
  const [faqs, setFaqs] = useState<Array<IFaq>>();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const isAdmin = currentUser?.role === "superadmin";
  const { data: faqsApiResponse, refetch: refetchFaqs } = useGetFaqsQuery({});
  const { data: ticketsApiResponse, refetch: refetchTickets } =
    useGetTicketsQuery({});
  const { data: fasApiCategoriesResponse, refetch: refetchFaqCategories } =
    useGetFaqCategoriesQuery({});

  return (
    <div className="row gy-0 mb-6 mb-xl-12">
      <div className="col-md-6">
        <div className="card card-md-stretch me-xl-3 mb-md-0 mb-6">
          <div className="card-body p-10 p-lg-15">
            <div className="d-flex flex-stack mb-7">
              <h1 className="fw-bold text-dark">
                {isAdmin ? "Latest Admin" : "My Support Tickets"}
              </h1>
              {ticketsApiResponse?.total && (
                <>
                  <div className="d-flex align-items-center">
                    <span
                      className="text-primary fw-bold me-1 "
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/help-center/tickets")}
                    >
                      All
                    </span>
                    <i className="ki-duotone ki-arrow-right fs-2 text-primary">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                  </div>
                </>
              )}
            </div>
            {ticketsApiResponse?.total ? (
              ticketsApiResponse?.data?.slice(0, 6).map((ticket) => (
                <div key={ticket._id} className="m-0">
                  <div
                    className="d-flex align-items-center collapsible py-3 toggle mb-0 collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target={`#kt_support_${ticket._id}`}
                    aria-expanded="false"
                  >
                    <div className="ms-n1 me-5">
                      <i className="ki-duotone ki-down toggle-on text-primary fs-2"></i>
                      <i className="ki-duotone ki-right toggle-off fs-2"></i>
                    </div>
                    <div className="d-flex align-items-center flex-wrap">
                      <h3 className="text-gray-800 fw-semibold cursor-pointer me-3 mb-2">
                        {ticket.subject}
                      </h3>
                      <span className="badge badge-light-warning my-1 d-block">
                        {ticket?.status || "Pending"}
                      </span>
                    </div>
                  </div>
                  <div
                    id={`kt_support_${ticket._id}`}
                    className="fs-6 ms-10 collapse"
                  >
                    <div className="mb-4">
                      <span className="text-muted fw-semibold fs-5">
                        {ticket.description}
                      </span>{" "}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mb-4">
                <span className="text-muted fw-semibold fs-5">
                  You have not made any request
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card card-md-stretch ms-xl-3">
          <div className="card-body p-10 p-lg-15">
            <div className="d-flex flex-stack mb-7">
              <h1 className="fw-bold text-dark">FAQ</h1>
              {faqsApiResponse?.total && (
                <div className="d-flex align-items-center">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/help-center/faq")}
                    className="text-primary fw-bold me-1"
                  >
                    Full FAQ
                  </span>
                  <i className="ki-duotone ki-arrow-right fs-2 text-primary">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                </div>
              )}
            </div>
            <div className="m-0">
              {faqsApiResponse?.total !== 0 ? (
                faqsApiResponse?.data
                  .flatMap((category) => category.faqs)
                  .map((faq) => {
                    return (
                      <div key={faq?._id}>
                        <div
                          className="d-flex align-items-center collapsible py-3 toggle mb-0 collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target={`#kt_support_${faq?._id}`}
                          aria-expanded="false"
                        >
                          <div className="ms-n1 me-5">
                            <i className="ki-duotone ki-down toggle-on text-primary fs-2"></i>
                            <i className="ki-duotone ki-right toggle-off fs-2"></i>
                          </div>
                          <div className="d-flex align-items-center flex-wrap">
                            <h3 className="text-gray-800 fw-semibold cursor-pointer me-3 mb-0">
                              {faq?.question}
                            </h3>
                            <span className="badge badge-light my-1 d-none">
                              {" "}
                              {faq?.answer}
                            </span>
                          </div>
                        </div>
                        <div
                          id={`kt_support_${faq._id}`}
                          className="fs-6 ms-10 collapse"
                        >
                          <div className="mb-4">
                            <span className="text-muted fw-semibold fs-5">
                              {faq?.answer}
                            </span>
                            <a href="#" className="d-none"></a>
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="mb-4">
                  <span className="text-muted fw-semibold fs-5">No Faq</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterOverview;
