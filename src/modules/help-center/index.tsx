import React, { useState } from "react";
import { PageLink, PageTitle } from "../../_metronic/layout/core";
import HelpCenterOverview from "./overveiw";
import HelpCenterFAQ from "./faq/all";
import HelpCenterTickets from "./tickets";
import CreateTicket from "./tickets/createTicket";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

import Ticket from "./tickets/ticket";
import CreateTicketCategory from "./tickets/createTicketCategory";
import CreateFaqCategory from "./faq/createFaqCategory";
import { IFaq } from "../../types/faq";
import { ITicket } from "../../types/ticket";
import { IFaqCategories } from "../../types/faq-categories";
import { Content } from "../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import CreateFaq from "./faq/createFaq";
import { useGetFaqCategoriesQuery } from "../../features/faq-categories";
import { useGetFaqsQuery } from "../../features/faq";
import CustomButton from "../../components/common/Button";

const HelpCenter = () => {
  const [selectedFaq, setFAQ] = useState<IFaq | null>();
  const [selectedCategory, setCelectedCategory] = useState<IFaq | null>();
  const [TICKET, setTICKET] = useState<ITicket>();
  const [isOpenCreateFaqCategory, setIsOpenCreateFaqCategory] =
    useState<boolean>();
  const handleViewTicket = (ticket: ITicket) => {
    setPage("ticket");
    setTICKET(ticket);
  };

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [page, setPage] = useState<"overview" | "faq" | "tickets" | "ticket">(
    "overview"
  );
  const faqBreadcrumbs: Array<PageLink> = [
    {
      title: "Home",
      path: "/",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "",
      path: "/",
      isSeparator: true,
      isActive: false,
    },
  ];
  const [createTicket, setCreateTicket] = useState<IFaq>();
  const [isOpencreateTicket, setIsOpenCreateTicket] = useState<boolean>(false);
  const [isOpenFaq, setIsOpenFaq] = useState<boolean>(false);
  const { data: faqsApiCategoriesResponse, refetch: refetchFaqCategories } =
    useGetFaqCategoriesQuery({});

  const [createCatTicket, setCreateTicketCategory] = useState<ITicket | null>();

  const { data: faqsApiResponse, refetch: refetchFaqs } = useGetFaqsQuery({});
  const [isOpenCreateTicketCategory, setIsOpenCreateTicketCategory] =
    useState<boolean>();

  const [createCatFaq, setCreateFaqCategory] =
    useState<IFaqCategories | null>();

  const handleOpenCreateFaq = () => {
    setIsOpenFaq(true);
    setFAQ(null);
  };

  const handleOpenCreateFaqCat = (type: "open" | "close") => {
    if (type === "open") {
      setIsOpenCreateFaqCategory(true);
      setCelectedCategory(null);
    }
    if (type === "close") {
      setIsOpenCreateFaqCategory(false);
      setCelectedCategory(null);
    }
  };

  const handleOpenCreateTicketCat = (type: "open" | "close") => {
    if (type === "open") {
      setIsOpenCreateTicketCategory(true);
      setCreateTicketCategory(null);
    }
    if (type === "close") {
      setIsOpenCreateTicketCategory(false);
      setCreateTicketCategory(null);
    }
  };
  // const handleUpdate = (type: 'ticket' | 'faq', state: 'new' | 'close' | TFaq | TTicket) => {
  //   if (type === 'ticket') {
  //     setCreateTicket(state)
  //   }
  //   if (type === 'faq') {
  //     setCreateTicket(state)
  //   }
  // }
  return (
    <>
      <PageTitle breadcrumbs={faqBreadcrumbs}>Help Center</PageTitle>
      <ToolbarWrapper />
      <Content>
        <div className="card mb-12">
          <div className="card-body flex-column p-5">
            <div className="card-rounded bg-light d-flex flex-stack flex-wrap p-5">
              <ul className="nav flex-wrap border-transparent fw-bold">
                <li className="nav-item my-1">
                  <button
                    type="button"
                    onClick={() => setPage("overview")}
                    className={`btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase ${
                      page === "overview" && "active"
                    }`}
                  >
                    Overview
                  </button>
                </li>
                <li className="nav-item my-1">
                  <button
                    type="button"
                    onClick={() => setPage("tickets")}
                    className={`btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase  ${
                      page === "tickets" && "active"
                    }`}
                  >
                    Tickets
                  </button>
                </li>
                <li className="nav-item my-1">
                  <button
                    type="button"
                    onClick={() => setPage("faq")}
                    className={`btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase  ${
                      page === "faq" && "active"
                    }`}
                  >
                    FAQ
                  </button>
                </li>
                {/* <li className='nav-item my-1'>
                <button
                  type='button'
                  onClick={() => setPage('ticket')}
                  className={`btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase  ${
                    page === 'ticket' && 'active'
                  }`}
                >
                  Ticket
                </button>
              </li> */}
              </ul>
              <div className="d-flex gap-3">
                {page === "tickets" && (
                  <>
                    {/* <button
                      className="btn btn-primary fw-bold fs-8 fs-lg-base"
                      onClick={() => setIsOpenCreateTicket(true)}
                    >
                      Create Tickets
                    </button> */}

                    {currentUser?.role === "superadmin" && (
                      <button
                        className="btn btn-primary fw-bold fs-8 fs-lg-base"
                        onClick={() => setIsOpenCreateTicketCategory(true)}
                      >
                        Create Tickets Category
                      </button>
                    )}
                  </>
                )}
                {currentUser?.role === "superadmin" && page === "faq" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleOpenCreateFaq()}
                      className="btn btn-primary mr-5 fw-bold fs-8 fs-lg-base"
                    >
                      <i className="ki-duotone ki-badge fs-2  mx-2">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                      </i>
                      <span className="indicator-label">Create FAQ</span>
                    </button>

                    {currentUser?.role === "superadmin" && (
                      <button
                        className="btn btn-primary fw-bold fs-8 fs-lg-base"
                        onClick={() => handleOpenCreateFaqCat("open")}
                      >
                        Create Faq Category
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {page === "overview" && <HelpCenterOverview setPage={setPage} />}
        {page === "faq" && (
          <HelpCenterFAQ
            isOpenFaqForm={isOpenFaq}
            setIsOpenFaqForm={setIsOpenFaq}
            FAQ={selectedFaq}
            setFAQ={setFAQ}
          />
        )}
        {page === "tickets" && (
          <HelpCenterTickets handleViewTicket={handleViewTicket} />
        )}
        {page === "ticket" && <Ticket ticket={TICKET} setPage={setPage} />}

        {isOpencreateTicket && (
          <CreateTicket
            ticket={createTicket}
            setIsOpen={setIsOpenCreateTicket}
            setCreateTicket={setCreateTicket}
          />
        )}

        {isOpenCreateTicketCategory && (
          <CreateTicketCategory
            handleClose={() => handleOpenCreateTicketCat("close")}
            ticketCategory={createCatTicket}
            setCreateTicketCategory={setCreateTicketCategory}
          />
        )}
        {isOpenCreateFaqCategory && (
          <CreateFaqCategory
            category={createCatFaq}
            setCreateFaqCategory={setCreateFaqCategory}
            setClose={() => handleOpenCreateFaqCat("close")}
          />
        )}

        {/* {currentUser?.role === "superadmin" && selectedCategory && (
          <CreateFaqCategory
            category={selectedCategory}
            setCategory={setCelectedCategory}
            refresh={refetchFaqCategories}
          />
        )} */}
        {currentUser?.role === "superadmin" && isOpenFaq && (
          <CreateFaq
            faq={selectedFaq}
            faqCategories={faqsApiCategoriesResponse?.data || []}
            setFAQ={setFAQ}
            refresh={refetchFaqs}
            setIsOpenFaqForm={setIsOpenFaq}
          />
        )}
      </Content>
    </>
  );
};

export default HelpCenter;
