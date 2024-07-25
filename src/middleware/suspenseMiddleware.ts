import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { setError, setLoading } from "../redux/slice/suspenseSlice";

const suspenseMiddleware: Middleware =
  (storeAPI: MiddlewareAPI) => (next) => (action: any) => {
    if (action.type.endsWith("/pending")) {
      storeAPI.dispatch(setLoading(true));
    } else if (
      action.type.endsWith("/fulfilled") ||
      action.type.endsWith("/rejected")
    ) {
      storeAPI.dispatch(setLoading(false));

      if (isRejectedWithValue(action)) {
        storeAPI.dispatch(
          setError(action.payload?.message || "An error occurred")
        );
      } else {
        storeAPI.dispatch(setError(null));
      }
    }

    return next(action);
  };

export default suspenseMiddleware;
