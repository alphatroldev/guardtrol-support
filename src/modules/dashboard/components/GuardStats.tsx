import { useEffect, useRef, FC } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useThemeMode } from "../../../_metronic/partials";
import { KTIcon } from "../../../_metronic/helpers";
import { useGetGuardsQuery } from "../../../features/guard";

const GuardStats = ({ className }: any) => {
  const { data: ActiveguardsApiResponse } = useGetGuardsQuery({
    isactive: true,
  });
  const { data: inActiveguardsApiResponse } = useGetGuardsQuery({
    isactive: false,
  });
  const { data: guardsApiResponse } = useGetGuardsQuery({});
  return (
    <div className={`card ${className}`}>
      <div className="card-header border-0 py-2">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Guards </span>
        </h3>
      </div>

      <div className="card-body  d-flex flex-column pt-0">
        <div className="row g-0">
          {/* <div className="col mr-8">
            <div className="fs-7 text-muted fw-semibold">Total</div>

            <div className="fs-4 fw-bold">{guardsApiResponse?.total}</div>
          </div> */}

          <div className="col mr-8">
            <div className="fs-7 text-muted fw-semibold">Enabled</div>

            <div className="d-flex align-items-center">
              <div className="fs-4 fw-bold">
                {ActiveguardsApiResponse?.total}
              </div>
            </div>
          </div>

          <div className="col mr-8">
            <div className="fs-7 text-muted fw-semibold">Disabled</div>

            <div className="fs-4 fw-bold">
              {inActiveguardsApiResponse?.total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { GuardStats };
