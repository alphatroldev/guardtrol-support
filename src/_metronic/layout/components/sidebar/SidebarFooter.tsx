import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { clearAuth } from "../../../../redux/slice/authSlice";
import { KTIcon } from "../../../helpers";

const SidebarFooter = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      className="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
      id="kt_app_sidebar_footer"
    >
      <button
        onClick={() => dispatch(clearAuth())}
        className="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
        data-bs-toggle="tooltip"
      >
        <span className="btn-label">Sign Out</span>
        <KTIcon iconName="document" className="btn-icon fs-2 m-0" />
      </button>
    </div>
  );
};

export { SidebarFooter };
