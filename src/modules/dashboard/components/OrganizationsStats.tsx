import { useEffect, useRef, FC } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useThemeMode } from "../../../_metronic/partials";
import { KTIcon } from "../../../_metronic/helpers";

const OrganizationsStats = ({
  className,
  activeOrganizations,
  inActiveOrganizations,
  totalOrganizations,
}: any) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-header border-0 py-2">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Organizations</span>
        </h3>
      </div>

      <div className="card-body  d-flex flex-column pt-0">
        <div className="row g-0">
          {/* <div className="col mr-8">
            <div className="fs-7 text-muted fw-semibold">Total</div>

            <div className="fs-4 fw-bold">{totalOrganizations}</div>
          </div> */}

          <div className="col mr-8">
            <div className="fs-7 text-muted fw-semibold">Active</div>

            <div className="d-flex align-items-center">
              <div className="fs-4 fw-bold">{activeOrganizations}</div>
            </div>
          </div>

          <div className="col mr-8">
            <div className="fs-7 text-muted fw-semibold">Inactive</div>

            <div className="fs-4 fw-bold">{inActiveOrganizations}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { OrganizationsStats };
