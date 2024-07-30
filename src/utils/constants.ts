export const API_BASE_URL =
  import.meta.env.NODE_ENV === "development"
    ? "http://localhost:5000/support-api"
    : `${import.meta.env.VITE_APP_API_URL}/support-api`;

export const ASSETS_URL =
  import.meta.env.NODE_ENV === "development"
    ? "http://localhost:5000/"
    : import.meta.env.VITE_APP_API_URL;

export const CLIENT_URL =
  import.meta.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : import.meta.env.VITE_CLIENT_URL;
