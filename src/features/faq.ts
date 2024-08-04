import baseApi from "./baseApi";
import { IFaq, IFaqApiResponse } from "../types/faq";
import { PaginatedResponse } from "../types/Statics";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<PaginatedResponse<IFaqApiResponse[]>, any>({
      query: (params) => ({
        url: `faqs`,
        params,
      }),
      providesTags: [{ type: "Faq", id: "LIST" }],
    }),
    getFaqById: builder.query<IFaq, string>({
      query: (id) => `faqs/${id}`,
      providesTags: (result, error, id) => [{ type: "Faq", id }],
    }),
    assignFaqById: builder.query<IFaq, string>({
      query: (id) => `faqs/${id}`,
      providesTags: (result, error, id) => [{ type: "Faq", id }],
    }),
    createFaq: builder.mutation<IFaq, Partial<IFaq>>({
      query: (faq) => ({
        url: "faqs",
        method: "POST",
        body: faq,
      }),
      invalidatesTags: [{ type: "Faq", id: "LIST" }],
    }),
    updateFaq: builder.mutation<
      { success: boolean },
      { id: string; data: Partial<IFaq> }
    >({
      query: ({ id, data }) => ({
        url: `faqs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Faq", id }],
    }),

    deleteFaq: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Faq", id }],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useGetFaqByIdQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
