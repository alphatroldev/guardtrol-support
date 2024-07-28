import { FC, useEffect, useRef, useState } from "react";
import { SearchComponent } from "../../../assets/ts/components";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";

const Search: FC = () => {
  const [menuState, setMenuState] = useState<
    "main" | "advanced" | "preferences"
  >("main");
  const element = useRef<HTMLDivElement | null>(null);
  const wrapperElement = useRef<HTMLDivElement | null>(null);
  const resultsElement = useRef<HTMLDivElement | null>(null);
  const suggestionsElement = useRef<HTMLDivElement | null>(null);
  const emptyElement = useRef<HTMLDivElement | null>(null);

  const processs = (search: SearchComponent) => {
    setTimeout(function () {
      const number = Math.floor(Math.random() * 6) + 1;

      // Hide recently viewed
      suggestionsElement.current!.classList.add("d-none");

      if (number === 3) {
        // Hide results
        resultsElement.current!.classList.add("d-none");
        // Show empty message
        emptyElement.current!.classList.remove("d-none");
      } else {
        // Show results
        resultsElement.current!.classList.remove("d-none");
        // Hide empty message
        emptyElement.current!.classList.add("d-none");
      }

      // Complete search
      search.complete();
    }, 1500);
  };

  const clear = () => {
    // Show recently viewed
    suggestionsElement.current!.classList.remove("d-none");
    // Hide results
    resultsElement.current!.classList.add("d-none");
    // Hide empty message
    emptyElement.current!.classList.add("d-none");
  };

  useEffect(() => {
    // Initialize search handler
    const searchObject = SearchComponent.createInsance("#kt_header_search");

    // Search handler
    searchObject!.on("kt.search.process", processs);

    // Clear handler
    searchObject!.on("kt.search.clear", clear);
  }, []);

  return (
    <>
      <div
        id="kt_header_search"
        className="d-flex align-items-stretch"
        data-kt-search-keypress="true"
        data-kt-search-min-length="2"
        data-kt-search-enter="enter"
        data-kt-search-layout="menu"
        data-kt-menu-trigger="auto"
        data-kt-menu-overflow="false"
        data-kt-menu-permanent="true"
        data-kt-menu-placement="bottom-end"
        ref={element}
      >
        <div
          className="d-flex align-items-center"
          data-kt-search-element="toggle"
          id="kt_header_search_toggle"
        >
          <div className="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px">
            <KTIcon iconName="magnifier" className="fs-2" />
          </div>
        </div>

        <div
          data-kt-search-element="content"
          className="menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px"
        >
          <div
            className={`${menuState === "main" ? "" : "d-none"}`}
            ref={wrapperElement}
            data-kt-search-element="wrapper"
          >
            <form
              data-kt-search-element="form"
              className="w-100 position-relative mb-3"
              autoComplete="off"
            >
              <KTIcon
                iconName="magnifier"
                className="fs-2 text-lg-1 text-gray-500 position-absolute top-50 translate-middle-y ms-0"
              />

              <input
                type="text"
                className="form-control form-control-flush ps-10"
                name="search"
                placeholder="Search..."
                data-kt-search-element="input"
              />

              <span
                className="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-1"
                data-kt-search-element="spinner"
              >
                <span className="spinner-border h-15px w-15px align-middle text-gray-500" />
              </span>

              <span
                className="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none"
                data-kt-search-element="clear"
              >
                <KTIcon iconName="cross" className="fs-2 text-lg-1 me-0" />
              </span>

              <div
                className="position-absolute top-50 end-0 translate-middle-y"
                data-kt-search-element="toolbar"
              >
                <div
                  data-kt-search-element="preferences-show"
                  className="btn btn-icon w-20px btn-sm btn-active-color-primary me-1"
                  data-bs-toggle="tooltip"
                  onClick={() => {
                    setMenuState("preferences");
                  }}
                  title="Show search preferences"
                >
                  <KTIcon iconName="setting-2" className="fs-1" />
                </div>

                <div
                  data-kt-search-element="advanced-options-form-show"
                  className="btn btn-icon w-20px btn-sm btn-active-color-primary"
                  data-bs-toggle="tooltip"
                  onClick={() => {
                    setMenuState("advanced");
                  }}
                  title="Show more search options"
                >
                  <KTIcon iconName="down" className="fs-2" />
                </div>
              </div>
            </form>
          </div>

          <form className={`pt-1 ${menuState === "advanced" ? "" : "d-none"}`}>
            <h3 className="fw-bold text-gray-900 mb-7">Advanced Search</h3>

            <div className="mb-5">
              <input
                type="text"
                className="form-control form-control-sm form-control-solid"
                placeholder="Contains the word"
                name="query"
              />
            </div>

            <div className="mb-5">
              <div className="nav-group nav-group-fluid">
                <label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="type"
                    value="has"
                    defaultChecked
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">
                    All
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="type"
                    value="users"
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                    Users
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="type"
                    value="orders"
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                    Orders
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="type"
                    value="projects"
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                    Projects
                  </span>
                </label>
              </div>
            </div>

            <div className="mb-5">
              <select
                name="timezone"
                aria-label="Select a Timezone"
                data-control="select2"
                data-placeholder="date_period"
                className="form-select form-select-sm form-select-solid"
              >
                <option value="next">Within the next</option>
                <option value="last">Within the last</option>
                <option value="between">Between</option>
                <option value="on">On</option>
              </select>
            </div>

            <div className="d-flex justify-content-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMenuState("main");
                }}
                className="btn btn-sm btn-light fw-bolder btn-active-light-primary me-2"
              >
                Cancel
              </button>

              <a
                href="/#"
                className="btn btn-sm fw-bolder btn-primary"
                data-kt-search-element="advanced-options-form-search"
              >
                Search
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { Search };
