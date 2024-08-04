import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../utils/constants";

const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Organization",
    "Beats",
    "TicketCategories",
    "Ticket",
    "TicketResponse",
    "FaqCategories",
    "SupportUsers",
    "Faq",
  ],
  endpoints: () => ({}),
});

export default baseApi;
