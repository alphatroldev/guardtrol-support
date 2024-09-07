import React, { FC } from "react";
import { useGetOrganizationsQuery } from "../features/organization";
import Select from "react-select";
import { KTIcon } from "../_metronic/helpers";
import { Spinner } from "react-bootstrap";
import CustomButton from "./common/Button";

interface ReusableTableProps {
  data: any[];
  columns: {
    lowerCase: boolean;
    header: string;
    accessor: string;
    sortable?: boolean;
    minw?: string;
  }[];
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  buttonText?: string;
  sortOrder?: any;
  sortBy?: any;
  showButton?: boolean;
  hasViewBtn?: boolean;
  hasEditBtn?: boolean;
  showSearch?: boolean;
  tableFilters?: Filter[];
  sorts?: any;
  total: any | null;
  title: any | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  filters: {
    limit: number;
    onLimitChange: (limit: number) => void;
  };
  onClick?: () => void;
  handleSort?: (col: any) => void;
  searchAction?: (e: any) => void;
  onClickView?: (id: any) => void;
  onClickEdit?: () => void;
  refetch: () => void;
}
interface Filter {
  name: string;
  filterOptions: { label: string; value: string }[];
  onchange: (value: any) => void;
}

const ReusableTable: FC<ReusableTableProps> = ({
  data,
  columns,
  buttonText,
  hasViewBtn,
  title,
  handleSort,
  isLoading,
  isFetching,
  error,
  sortBy,
  sortOrder,
  showButton,
  total,
  hasEditBtn,
  pagination,
  showSearch,
  searchAction,
  onClickView,
  onClickEdit,
  tableFilters,
  filters,
  refetch,
  onClick,
}) => {
  const options = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => pagination.onPageChange(i)}
          className={`page-item ${
            pagination.currentPage === i ? "active" : ""
          }`}
        >
          <button className="page-link">{i}</button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={`card `}>
      <div className="card-header  pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">{title}</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            {total} {title}
          </span>
        </h3>
        <div className="card-toolbar d-flex gap-2">
          <div className="d-flex gap-2 ">
            {tableFilters?.map((filter) => (
              <select
                className="form-control form-select "
                style={{
                  height: "35px",
                  padding: "0 30px 0 10px",
                  width: "max-content",
                }}
                key={`${filter.name}`}
                onChange={(e) => filter.onchange(e.target.value)}
              >
                <option value="">{`${filter.name}`}</option>
                {filter.filterOptions.map((option) => (
                  <option value={`${option.value}`}>{option.label}</option>
                ))}
              </select>
            ))}
          </div>
          {showSearch && (
            <div className="d-flex align-items-center position-relative me-4">
              <KTIcon
                iconName="magnifier"
                className="fs-3 position-absolute ms-3"
              />
              <input
                type="text"
                onChange={searchAction}
                id="kt_filter_search"
                className="form-control form-control-white form-control-sm w-150px ps-9"
                placeholder="Search"
              />
            </div>
          )}
          <CustomButton
            showLoading={isFetching && !error}
            btnAction={refetch}
            btnText={"Refetch"}
          />
          {showButton && !error && (
            <CustomButton btnAction={onClick} btnText={buttonText || ""} />
          )}
        </div>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive mb-5">
          <>
            <table className="table align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted bg-light">
                  {columns.map((col, i) => {
                    return (
                      <th
                        style={{
                          cursor: "pointer",
                          ...(col.minw && { minWidth: col.minw }),
                        }}
                        onClick={() =>
                          col.sortable && handleSort && handleSort(col.accessor)
                        }
                        className={`ps-4  ${i === 0 && "rounded-start"} ${
                          i === columns?.length - 1 &&
                          !hasViewBtn &&
                          "rounded-end"
                        }`}
                        key={col.accessor}
                      >
                        {col.header}
                        {col.sortable && (
                          <>
                            {sortOrder === -1 && sortBy === col.accessor && (
                              <KTIcon
                                iconName="arrow-down"
                                className="fs-3 position-absolute ms-3"
                              />
                            )}
                            {sortOrder === 1 && sortBy === col.accessor && (
                              <KTIcon
                                iconName="arrow-up"
                                className="fs-3 position-absolute ms-3"
                              />
                            )}
                            {sortBy !== col.accessor && col.sortable && (
                              <KTIcon
                                iconName="sort"
                                className="fs-3 position-absolute ms-3"
                              />
                            )}
                          </>
                        )}
                      </th>
                    );
                  })}
                  {hasViewBtn && (
                    <th className={`ps-4 rounded-end text-center`}>Actions</th>
                  )}
                </tr>
              </thead>
              {(isLoading || isFetching) && (
                <tr>
                  <td colSpan={columns.length + 1}>
                    <div className=" justify-content-center align-items-center d-flex py-10">
                      <Spinner animation="border" className="" />
                    </div>
                  </td>
                </tr>
              )}
              {error && !isFetching && (
                <tr>
                  <td colSpan={columns.length + 1}>
                    <div className=" justify-content-center align-items-center d-flex py-10">
                      <p className="text-danger text-center fw-semibold">
                        Error: {error?.data?.error || "Network Unavailable"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {(!isLoading || !isFetching) && !error && (
                <tbody>
                  {data?.length === 0 && (
                    <tr>
                      <td colSpan={columns.length + 1}>
                        <div className=" justify-content-center align-items-center d-flex py-10">
                          <span className="text-muted">No {title}</span>
                        </div>
                      </td>
                    </tr>
                  )}

                  {!isFetching &&
                    data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {columns.map((col, i) => (
                          <td
                            className={`text-gray-900 fw-bold text-hover-primary ${
                              col.lowerCase
                                ? "text-lowercase"
                                : "text-capitalize"
                            } fs-6 ${i === 0 && "ml-10"}`}
                            key={col.accessor}
                          >
                            {row[col.accessor]}
                          </td>
                        ))}

                        {(hasViewBtn || hasEditBtn) && (
                          <td className="text-center">
                            {hasViewBtn && (
                              <button
                                onClick={() =>
                                  onClickView && onClickView(row["_id"])
                                }
                                className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2"
                              >
                                View
                              </button>
                            )}
                            {hasEditBtn && (
                              <a
                                onClick={() => onClickEdit && onClickEdit()}
                                href="#"
                                className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4"
                              >
                                Edit
                              </a>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </>
        </div>
        <div className="d-flex justify-content-between">
          <Select
            className="react-select-styled"
            classNamePrefix="react-select"
            options={options}
            defaultValue={options.find((opt) => opt.value === filters.limit)}
            onChange={(option) => filters.onLimitChange(option!.value)}
          />
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage - 1)
                }
                className={`page-item ${
                  pagination.currentPage === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  disabled={pagination.currentPage === 1}
                >
                  &laquo;
                </button>
              </li>
              {renderPageNumbers()}
              <li
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage + 1)
                }
                className={`page-item ${
                  pagination.currentPage === pagination.totalPages
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ReusableTable;
