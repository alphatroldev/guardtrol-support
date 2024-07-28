import { FC, useState } from "react";
import { useParams } from "react-router-dom";

import { IGuard } from "../../../../types/guard";
import { GuardCard } from "../../../../components/cards/guard-card";
import { useGetGuardsQuery } from "../../../../services/guard";
import { Spinner } from "react-bootstrap";
import CustomButton from "../../../../components/common/Button";
import CreateGuardForm from "./create-guard";

const OrganizationGuards: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [showCreateGuardModal, setShowCreateGuardModal] =
    useState<boolean>(false);

  const { organizationId } = useParams<{ organizationId: string }>();
  const {
    data: guardsApiResponse,
    error,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetGuardsQuery({
    page,
    limit,
    organization: organizationId,
  });

  return (
    <>
      <div className="d-flex flex-wrap flex-stack mb-6">
        <h3 className="fw-bolder my-2">
          Guards
          <span className="fs-6 text-gray-500 fw-bold ms-1">
            ({guardsApiResponse?.total ?? 0})
          </span>
        </h3>

        <div className="d-flex my-2 gap-2">
          {/* <select
            name="status"
            data-control="select2"
            data-hide-search="true"
            className="form-select form-select-white form-select-sm w-125px"
            defaultValue="Online"
          >
            <option value="Active">Active</option>
            <option value="InActive">Inactive</option>
            <option value="OffDuty">Off Duty</option>
            <option value="OnDuty">On Duty</option>
          </select> */}
          <CustomButton
            btnAction={() => setShowCreateGuardModal(true)}
            btnText={"Create"}
          />
        </div>
      </div>
      {guardsApiResponse?.data.length === 0 && (
        <div className=" justify-content-center align-items-center d-flex py-10">
          <span className="text-muted">No Guards</span>
        </div>
      )}
      {isLoading ? (
        <div className=" justify-content-center align-items-center d-flex py-10">
          <Spinner animation="border" className="" />
        </div>
      ) : error ? (
        <p>Error loading guards</p>
      ) : (
        <div className="row g-6 g-xl-9">
          {guardsApiResponse?.data.map((guard: IGuard) => (
            <div className="col-md-3 col-lg-3 " key={guard._id}>
              <GuardCard
                name={guard.name}
                phone={guard.phone}
                status={guard.status}
                isactive={guard.isactive}
                profileImage="media/avatars/blank.png"
              />
            </div>
          ))}
        </div>
      )}

      <div className="d-flex flex-stack flex-wrap pt-10">
        <div className="fs-6 fw-bold text-gray-700">
          Showing {page} to{" "}
          {Math.min(page * limit, guardsApiResponse?.total ?? 0)} of{" "}
          {guardsApiResponse?.total ?? 0} entries
        </div>

        <ul className="pagination">
          <li className="page-item previous">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="page-link"
            >
              <i className="previous"></i>
            </button>
          </li>

          {[
            ...Array(Math.ceil((guardsApiResponse?.total ?? 0) / limit)).keys(),
          ].map((pageNumber) => (
            <li
              className={`page-item ${page === pageNumber + 1 ? "active" : ""}`}
              key={pageNumber}
            >
              <button
                onClick={() => setPage(pageNumber + 1)}
                className="page-link"
              >
                {pageNumber + 1}
              </button>
            </li>
          ))}

          <li className="page-item next">
            <button
              onClick={() =>
                setPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil((guardsApiResponse?.total ?? 0) / limit)
                  )
                )
              }
              className="page-link"
            >
              <i className="next"></i>
            </button>
          </li>
        </ul>
      </div>
      <CreateGuardForm
        show={showCreateGuardModal}
        handleClose={() => setShowCreateGuardModal(false)}
      />
    </>
  );
};

export { OrganizationGuards };
