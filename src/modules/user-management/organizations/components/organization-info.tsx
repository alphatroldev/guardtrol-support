import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrganizationByIdQuery } from "../../../../features/organization";
import { formatDateTime } from "../../../../utils/dateUtils";

type Props = {};

const OrganizationInfo = (props: Props) => {
  const params = useParams();
  const { organizationId } = useParams();

  const { data: organization } = useGetOrganizationByIdQuery(
    organizationId || "",
    {
      skip: organizationId ? false : true,
    }
  );
  return (
    <div className="card-lg-stretch h-100 card">
      <div className="card-header">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Organization Info
          </span>
        </h3>
      </div>
      <div className="card-body">
        <div className="row mb-7">
          <label className="col-lg-4 fw-bold text-muted"> Name</label>

          <div className="col-lg-8">
            <span className="fw-bolder fs-6 text-gray-900">
              {organization?.name || "Not Set"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-bold text-muted"> Address</label>

          <div className="col-lg-8">
            <span className="fw-bolder fs-6 text-gray-900">
              {organization?.address || "Not Set"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-bold text-muted"> Contact Number</label>

          <div className="col-lg-8">
            <span className="fw-bolder fs-6 text-gray-900">
              {organization?.phone || "Not Set"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-bold text-muted">
            {" "}
            Whatsapp Contact
          </label>

          <div className="col-lg-8">
            <span className="fw-bolder fs-6 text-gray-900">
              {organization?.whatsappNumber || "Not Set"}
            </span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-bold text-muted">Date Registered</label>

          <div className="col-lg-8">
            <span className="fw-bolder fs-6 text-gray-900">
              {organization?.createdAt
                ? formatDateTime(organization?.createdAt)
                : "Not Set"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;
