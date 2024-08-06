import React, { useState } from "react";
import { PageLink, PageTitle } from "../../_metronic/layout/core";
import { Content } from "../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import { useLocation, Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const HelpCenter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.user);

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
                  <Link
                    to="/help-center/overview"
                    className={`btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase ${
                      location.pathname === "/help-center/overview" && "active"
                    }`}
                  >
                    Overview
                  </Link>
                </li>
                <li className="nav-item my-1">
                  <Link
                    to="/help-center/tickets"
                    className={`btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase ${
                      location.pathname === "/help-center/tickets" && "active"
                    }`}
                  >
                    Tickets
                  </Link>
                </li>
                <li className="nav-item my-1">
                  <Link
                    to="/help-center/faq"
                    className={`btn btn-color-gray-600 btn-active-secondary btn-active-color-primary fw-bolder fs-8 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase ${
                      location.pathname === "/help-center/faq" && "active"
                    }`}
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
              <div className="d-flex gap-3">
                {location.pathname === "/help-center/tickets" && (
                  <>
                    {currentUser?.role === "superadmin" && (
                      <Link
                        className="btn btn-primary fw-bold fs-8 fs-lg-base"
                        to="/help-center/create-ticket-category"
                      >
                        Create Tickets Category
                      </Link>
                    )}
                  </>
                )}
                {currentUser?.role === "superadmin" &&
                  location.pathname === "/help-center/faq" && (
                    <>
                      <button
                        type="button"
                        onClick={() => navigate("/help-center/create-faq")}
                        className="btn btn-primary mr-5 fw-bold fs-8 fs-lg-base"
                      >
                        <i className="ki-duotone ki-badge fs-2 mx-2">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                          <span className="path4"></span>
                          <span className="path5"></span>
                        </i>
                        <span className="indicator-label">Create FAQ</span>
                      </button>
                      <button
                        className="btn btn-primary fw-bold fs-8 fs-lg-base"
                        onClick={() =>
                          navigate("/help-center/create-faq-category")
                        }
                      >
                        Create Faq Category
                      </button>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </Content>
    </>
  );
};

export default HelpCenter;
