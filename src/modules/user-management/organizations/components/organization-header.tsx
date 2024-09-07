import { FC } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dropdown1 } from "../../../../_metronic/partials";
import { useGetPatrolsQuery } from "../../../../features/patrol";
import { useGetPointsQuery } from "../../../../features/point";
import { useGetGuardsQuery } from "../../../../features/guard";
import { useGetBeatsQuery } from "../../../../features/beat";
import {
  useGetOrganizationByIdQuery,
  useUpdateOrganizationStatusMutation,
} from "../../../../features/organization";
import {
  API_BASE_URL,
  ASSETS_URL,
  CLIENT_URL,
} from "../../../../utils/constants";
import CustomButton from "../../../../components/common/Button";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/slice/authSlice";
import axios from "axios";
import * as swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Spinner } from "react-bootstrap";

const MySwal = withReactContent(swal.default);

const OrganizationHeader: FC = () => {
  const location = useLocation();
  const params = useParams();
  const { organizationId } = useParams();
  const user = useSelector(selectUser);
  const [UpdateOrganizationStatus, UpdateOrganizationStatusDetails] =
    useUpdateOrganizationStatusMutation();
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

  const handleClientConsoleLogin = async () => {
    try {
      const clientTokenResponse = await axios.post(
        `${API_BASE_URL}/auth/generate-client-console-access`,
        {
          supportUserId: user?._id,
          organizationId,
        }
      );

      const clientAuthToken = clientTokenResponse?.data?.token;
      const clientConsoleUrl = `${CLIENT_URL}/auth?support_token=${clientAuthToken}`;
      // const clientConsoleUrl = `https://guardtrol.alphatrol.com/?support_token=${clientAuthToken}`;
      window.open(clientConsoleUrl, "_blank"); // Open in a new tab
    } catch (error) {
      console.error("Error generating client console access token:", error);
    }
  };

  const handleUpdateOrganizationStatus = (newStaus: any) => {
    MySwal.fire({
      title: `Are you sure, you want to ${
        newStaus ? "Enable" : "Disable"
      } Organization "${organization?.name}"?`,
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Yes!",
      showCancelButton: true,
      heightAuto: false,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
    }).then((result: any) => {
      if (result.isConfirmed) {
        UpdateOrganizationStatus({
          id: organizationId || "",
          data: { status: newStaus ? "enabled" : "disabled" },
        }).then((res) => {
          if (res?.data) {
            // refreshProject()
            MySwal.fire({
              title: "Updated",
              text: `Organization has been ${
                newStaus ? "Enabled" : "Disabled"
              }.`,
              icon: "success",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
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
                      ? `${ASSETS_URL + "/" + organization?.image}`
                      : toAbsoluteUrl("media/avatars/blank.png")
                  }
                  alt={`${organization?.name}`}
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
                    {organization?.status === "active" && (
                      <a href="#">
                        <KTIcon
                          iconName="verify"
                          className="fs-1 text-primary"
                        />
                      </a>
                    )}
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

                <div className="d-flex my-4">
                  <div className="mt-1 pe-10">
                    <div className="form-check form-switch form-check-custom form-check-solid">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={"id"}
                        disabled={UpdateOrganizationStatusDetails.isLoading}
                        checked={organization?.status === "enabled"}
                        onChange={() =>
                          handleUpdateOrganizationStatus(
                            !(organization?.status === "enabled")
                          )
                        }
                      />
                      <label className="form-check-label" htmlFor={"id"}>
                        {UpdateOrganizationStatusDetails.isLoading ? (
                          <Spinner size="sm" animation="border" />
                        ) : organization?.status !== "enabled" ? (
                          "Enable"
                        ) : (
                          "Disable"
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="me-0">
                    <div className="card-toolbar">
                      <CustomButton
                        showLoading={false}
                        btnAction={() => handleClientConsoleLogin()}
                        btnText="Login to client console"
                      />
                    </div>
                    <Dropdown1 />
                  </div>
                </div>
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
              {/* <li className="nav-item">
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
              </li> */}
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname ===
                      `/user-management/organizations/${params?.organizationId}/subscriptions` &&
                      "active")
                  }
                  to={`/user-management/organizations/${params?.organizationId}/subscriptions`}
                >
                  Subscriptions
                </Link>
              </li>
              {/* <li className="nav-item">
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
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export { OrganizationHeader };
