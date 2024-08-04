import baseApi from "./baseApi";
import { IFaqCategories } from "../types/faq-categories";
import { PaginatedResponse } from "../types/Statics";

export const ticketCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqCategories: builder.query<PaginatedResponse<IFaqCategories[]>, any>({
      query: (params) => ({
        url: `faq-categories`,
        params,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result?.data?.map(({ _id }) => ({
                type: "FaqCategories" as const,
                id: _id,
              })),
              { type: "FaqCategories", id: "LIST" },
            ]
          : [{ type: "FaqCategories", id: "LIST" }],
    }),
    getFaqCategoriesById: builder.query<IFaqCategories, string>({
      query: (id) => `faq-categories/${id}`,
      providesTags: (result, error, id) => [{ type: "FaqCategories", id }],
    }),
    createFaqCategories: builder.mutation<
      IFaqCategories,
      Partial<IFaqCategories>
    >({
      query: (ticketCategory) => ({
        url: "faq-categories",
        method: "POST",
        body: ticketCategory,
      }),
      invalidatesTags: [{ type: "FaqCategories", id: "LIST" }],
    }),

    updateFaqCategories: builder.mutation<
      { success: boolean },
      { id: string; data: Partial<IFaqCategories> }
    >({
      query: ({ id, data }) => ({
        url: `faq-categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "FaqCategories", id },
      ],
    }),

    deleteFaqCategories: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `faq-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "FaqCategories", id }],
    }),
  }),
});

export const {
  useGetFaqCategoriesQuery,
  useGetFaqCategoriesByIdQuery,
  useCreateFaqCategoriesMutation,
  useUpdateFaqCategoriesMutation,
  useDeleteFaqCategoriesMutation,
} = ticketCategoryApi;
