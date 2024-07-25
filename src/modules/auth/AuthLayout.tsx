import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../_metronic/helpers";

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100%";
    }
    return () => {
      if (root) {
        root.style.height = "auto";
      }
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center flex-lg-row h-100">
      <div
        className="w-lg-450px w-100 p-10 justify-content-center align-items-center"
        style={{ maxWidth: "450px" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export { AuthLayout };
