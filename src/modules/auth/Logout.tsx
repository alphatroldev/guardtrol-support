import { useEffect } from "react";
import { Navigate, Routes } from "react-router-dom";
import { useAuth } from "./core/Auth";
import { persistor } from "../../redux/store";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import baseApi from "../../services/baseApi";
import { clearAuth } from "../../redux/slice/authSlice";

export function Logout() {
  const handleLogout = () => {
    persistor.purge();
    useAppDispatch()(baseApi.util.resetApiState());
    useAppDispatch()(clearAuth());
  };

  useEffect(() => {
    handleLogout();
    document.location.reload();
  }, []);

  return (
    <Routes>
      <Navigate to="/auth/login" />
    </Routes>
  );
}
