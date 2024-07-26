import { FC } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dropdown1 } from "../../../../_metronic/partials";
import { useGetPatrolsQuery } from "../../../../services/patrol";
import { useGetPointsQuery } from "../../../../services/point";
import { useGetGuardsQuery } from "../../../../services/guard";
import { useGetBeatsQuery } from "../../../../services/beat";
import { useGetOrganizationByIdQuery } from "../../../../services/organization";
import { ASSETS_URL } from "../../../../utils/constants";

const OrganizationHeader: FC = () => {
  const location = useLocation();
  const params = useParams();
  const { organizationId } = useParams();

  const { data: patrolApiResponse } = useGetPatrolsQuery({
    organization: organizationId,
  });
  const { data: pointsApiResponse } = useGetPointsQuery({
    organization: organizationId,
  });

  const { data: guardsApiResponse } = useGetGuardsQuery({
    organization: organizationId,
  });
  const { data: beatsApiResponse } = useGetBeatsQuery({
    organization: organizationId,
  });
  const { data: organization } = useGetOrganizationByIdQuery(
    organizationId || "",
    {
      skip: organizationId ? false : true,
    }
  );

  console.log(organization);
  return (
    <>
      <div className="card mb-5 mb-xl-10">
        <div className="card-body pt-9 pb-0">
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <img
                  src={
                    organization?.image
                      ? `${ASSETS_URL + organization?.image}`
                      : toAbsoluteUrl("media/avatars/blank.png")
                  }
                  alt="Metornic"
                />
              </div>
            </div>

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <a
                      href="#"
                      className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                    >
                      {organization?.name}
                    </a>
                    <a href="#">
                      <KTIcon iconName="verify" className="fs-1 text-primary" />
                    </a>
                  </div>

                  <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                    >
                      <KTIcon iconName="geolocation" className="fs-4 me-1" />
                      {organization?.address || "Not Set"}
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                    >
                      <KTIcon iconName="sms" className="fs-4 me-1" />
                      {organization?.email || "Not Set"}
                    </a>
                  </div>
                </div>

                {/* <div className="d-flex my-4">
                  <div className="me-0">
                    <button
                      className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-end"
                      data-kt-menu-flip="top-end"
                    >
                      <i className="bi bi-three-dots fs-3"></i>
                    </button>
                    <Dropdown1 />
                  </div>
                </div> */}
              </div>

              <div className="d-flex flex-wrap flex-stack">
                <div className="d-flex flex-column flex-grow-1 pe-8">
                  <div className="d-flex flex-wrap">
                    <div className="border border-gray-300 border-dashed rounded min-w-50px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder">
                          {beatsApiResponse?.total || 0}
                        </div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-500">Beats</div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded min-w-50px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder">
                          {" "}
                          {guardsApiResponse?.total || 0}
                        </div>
                      </div>
                      <div className="fw-bold fs-6 text-gray-500">Guards</div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded min-w-50px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder">
                          {patrolApiResponse?.total || 0}
                        </div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-500">Patrol</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex overflow-auto h-55px">
            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname ===
                      `/user-management/organizations/${params?.organizationId}/overview` &&
                      "active")
                  }
                  to={`/user-management/organizations/${params?.organizationId}/overview`}
                >
                  Overview
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname ===
                      `/user-management/organizations/${params?.organizationId}/beats` &&
                      "active")
                  }
                  to={`/user-management/organizations/${params?.organizationId}/beats`}
                >
                  Beats
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname ===
                      `/user-management/organizations/${params?.organizationId}/guards` &&
                      "active")
                  }
                  to={`/user-management/organizations/${params?.organizationId}/guards`}
                >
                  Guards
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname ===
                      `/user-management/organizations/${params?.organizationId}/patrols` &&
                      "active")
                  }
                  to={`/user-management/organizations/${params?.organizationId}/patrols`}
                >
                  Patrols
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname ===
                      `/user-management/organizations/${params?.organizationId}/points` &&
                      "active")
                  }
                  to={`/user-management/organizations/${params?.organizationId}/points`}
                >
                  Points
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname ===
                      `/user-management/organizations/${params?.organizationId}/settings` &&
                      "active")
                  }
                  to={`/user-management/organizations/${params?.organizationId}/settings`}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export { OrganizationHeader };
