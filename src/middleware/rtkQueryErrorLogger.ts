import { MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearAuth } from "../redux/slice/authSlice";
import { persistor } from "../redux/store";
import baseApi from "../services/baseApi";

export const rtkQueryErrorLogger =
  (api: MiddlewareAPI) => (next: any) => (action: any) => {
    if (isRejectedWithValue(action)) {
      if (action?.payload?.data?.error) {
        toast.error(action?.payload?.data?.error, {});
        return;
      }

      if (action?.payload?.data?.message) {
        if (
          action?.payload?.data?.message ==
            "Authentication Error TokenExpiredError: jwt expired" ||
          action?.payload?.data?.message ===
            "Authentication Error JsonWebTokenError: invalid signature"
        ) {
          persistor.purge();
          api.dispatch(clearAuth());
          baseApi.util.resetApiState();
        }
        toast.error(action?.payload?.data?.message, {});
        return;
      }
      if (action?.payload?.data?.errors) {
        toast.error(action?.payload?.data?.errors[0]?.message, {});
        return;
      } else {
        toast.error(action?.payload?.data?.error, {});
      }
    }
    return next(action);
  };
