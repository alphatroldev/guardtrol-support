import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Languages } from "./Languages";
import { toAbsoluteUrl } from "../../../helpers";
import { persistor } from "../../../../redux/store";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import baseApi from "../../../../features/baseApi";
import { clearAuth, selectUser } from "../../../../redux/slice/authSlice";
import { useSelector } from "react-redux";

const HeaderUserMenu: FC = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    persistor.purge();
    dispatch(baseApi.util.resetApiState());
    dispatch(clearAuth());
    navigate("/auth");
  };
  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            <img alt="Logo" src={toAbsoluteUrl("media/avatars/blank.png")} />
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              {currentUser?.name}
              <span className="badge badge-light-success text-capitalize fw-bolder fs-8 px-2 py-1 ms-2">
                {currentUser?.role === "superadmin"
                  ? "Super admin"
                  : currentUser?.role}
              </span>
            </div>
            <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      <div className="menu-item px-5">
        <Link to={"/crafted/pages/profile"} className="menu-link px-5">
          My Profile
        </Link>
      </div>

      <div className="menu-item px-5">
        <a onClick={() => handleLogout()} className="menu-link px-5">
          Sign Out
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
