export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/support-api"
    : `${process.env.VITE_APP_API_URL}api/`;
export const ASSETS_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/"
    : `${process.env.VITE_APP_API_URL}`;
