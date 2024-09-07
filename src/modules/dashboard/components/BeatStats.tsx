import { useEffect, useRef, FC } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useThemeMode } from "../../../_metronic/partials";
import { KTIcon } from "../../../_metronic/helpers";
import { useGetBeatsQuery } from "../../../features/beat";

const BeatStatsStats = ({ className }: any) => {
  const { data: ActivebeatsApiResponse } = useGetBeatsQuery({ isactive: true });
  const { data: inActivebeatsApiResponse } = useGetBeatsQuery({
    isactive: false,
  });
  const { data: beatsApiResponse } = useGetBeatsQuery({});
  return (
    <div className={`card ${className}`}>
      <div className="card-header border-0 py-2">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Beats </span>
        </h3>
      </div>

      <div className="card-body  d-flex flex-column pt-0">
        <div className="row g-0">
          {/* <div className="col mr-8">
            <div className="fs-7 text-muted fw-semibold">Total</div>

            <div className="fs-4 fw-bold">{beatsApiResponse?.total}</div>
          </div> */}

          <div className="col mr-8">
            <div className="fs-7 text-muted fw-semibold">Active</div>

            <div className="d-flex align-items-center">
              <div className="fs-4 fw-bold">
                {ActivebeatsApiResponse?.total}
              </div>
            </div>
          </div>

          <div className="col mr-8">
            <div className="fs-7 text-muted fw-semibold">Inactive</div>

            <div className="fs-4 fw-bold">
              {inActivebeatsApiResponse?.total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BeatStatsStats };
