import { FC } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Link, useLocation } from "react-router-dom";
import { Dropdown1 } from "../../../../_metronic/partials";
import { OrganizationBeats } from "./organization-beats";
import OrganizationInfo from "./organization-info";

const OrganizationOverview: FC = () => {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <OrganizationBeats />
        </div>
        <div className="col-6">
          <OrganizationInfo />
        </div>
      </div>
    </>
  );
};

export { OrganizationOverview };
