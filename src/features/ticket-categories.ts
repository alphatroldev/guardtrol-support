import baseApi from "./baseApi";
import { ITicketCategories } from "../types/ticket-categories";
import { PaginatedResponse } from "../types/Statics";

export const ticketCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTicketCategoriess: builder.query<
      PaginatedResponse<ITicketCategories[]>,
      any
    >({
      query: (params) => ({
        url: `ticket-categories`,
        params,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result?.data?.map(({ _id }) => ({
                type: "TicketCategories" as const,
                id: _id,
              })),
              { type: "TicketCategories", id: "LIST" },
            ]
          : [{ type: "TicketCategories", id: "LIST" }],
    }),
    getTicketCategoriesById: builder.query<ITicketCategories, string>({
      query: (id) => `ticket-categories/${id}`,
      providesTags: (result, error, id) => [{ type: "TicketCategories", id }],
    }),
    createTicketCategories: builder.mutation<
      ITicketCategories,
      Partial<ITicketCategories>
    >({
      query: (ticketCategory) => ({
        url: "ticket-categories",
        method: "POST",
        body: ticketCategory,
      }),
      invalidatesTags: [{ type: "TicketCategories", id: "LIST" }],
    }),

    updateTicketCategories: builder.mutation<
      { success: boolean },
      { id: string; data: Partial<ITicketCategories> }
    >({
      query: ({ id, data }) => ({
        url: `ticket-categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "TicketCategories", id },
      ],
    }),

    deleteTicketCategories: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `ticket-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "TicketCategories", id },
      ],
    }),
  }),
});

export const {
  useGetTicketCategoriessQuery,
  useGetTicketCategoriesByIdQuery,
  useCreateTicketCategoriesMutation,
  useUpdateTicketCategoriesMutation,
  useDeleteTicketCategoriesMutation,
} = ticketCategoryApi;
