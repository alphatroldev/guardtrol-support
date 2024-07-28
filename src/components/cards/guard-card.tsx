import { FC } from "react";
import { KTIcon, toAbsoluteUrl } from "../../_metronic/helpers";
import { IGuard } from "../../types/guard";

const GuardCard = ({ name, phone, status, isactive, profileImage }: any) => {
  const color = "success";
  console.log(name);
  return (
    <div className="card">
      <div className="card-body d-flex flex-center flex-wrap gap-3 p-4">
        <div className="mb-5">
          <div className="symbol symbol-75px ">
            {color ? (
              <span
                className={`symbol-label bg-light-${color} text-${color} fs-5 fw-bolder`}
              >
                {name.charAt(0)}
              </span>
            ) : (
              <img alt="Pic" src={toAbsoluteUrl(profileImage)} />
            )}
          </div>
        </div>
        <div className="d-flex flex-start flex-column text-start">
          <a
            href="#"
            className="fs-4 text-gray-800 text-hover-primary fw-bolder mb-0"
          >
            <span className="fs-4 text-gray-800 text-hover-primary fw-bolder mb-0">
              {name}
            </span>{" "}
            <br />
            {isactive ? (
              <span className="badge badge-light-success fw-bolder fs-8 ">
                Active
              </span>
            ) : (
              <span className="badge badge-light-danger fw-bolder fs-8 px-2 py-1 ms-2">
                Inactive
              </span>
            )}
            <span className="ms-1 badge badge-light-warning fw-bolder fs-8  py-1 ">
              {status}
            </span>
          </a>

          <div className="fw-bold text-gray-500 mb-1"></div>

          <div className="fw-bold fs-7 text-gray-500 mb-1">{phone}</div>
          {/* 
          <div className="d-flex flex-center flex-wrap mb-5 gap-2">
            <div className="border border-gray-300 border-dashed rounded min-w-125px px-4 py-3 mb-3">
              <div className="fs-7 fw-bolder text-gray-700">GBB Wuse</div>
              <div className="fw-bold text-gray-500">Assigned Beat</div>
            </div>

            <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
              <div className="fs-7 fw-bolder text-gray-700">5hrs Ago</div>
              <div className="fw-bold text-gray-500">Last Patrol</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export { GuardCard };
