import baseApi from "./baseApi";
import { ITicket, ITicketForm } from "../types/ticket";
import { PaginatedResponse } from "../types/Statics";

export const ticketsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query<PaginatedResponse<ITicket[]>, any>({
      query: (params) => ({
        url: `tickets`,
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.map(({ _id }) => ({
                type: "Ticket" as const,
                id: _id,
              })),
              { type: "Ticket", id: "LIST" },
            ]
          : [{ type: "Ticket", id: "LIST" }],
    }),
    getTicketById: builder.query<ITicket, string>({
      query: (id) => `tickets/${id}`,
      providesTags: (result, error, id) => [{ type: "Ticket", id }],
    }),

    createTicket: builder.mutation<ITicket, Partial<ITicketForm>>({
      query: (tickets) => ({
        url: "tickets",
        method: "POST",
        body: tickets,
      }),
      invalidatesTags: [{ type: "Ticket", id: "LIST" }],
    }),
    updateTicket: builder.mutation<
      { success: boolean },
      { id: string; data: Partial<ITicket> }
    >({
      query: ({ id, data }) => ({
        url: `tickets/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Ticket", id }],
    }),

    deleteTicket: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `tickets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Ticket", id }],
    }),
    assignTicketById: builder.mutation<{ success: boolean }, any>({
      query: ({ body, ticket }) => ({
        url: `tickets/assign/${ticket}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { ticket }) => [
        { type: "Ticket", id: ticket },
        { type: "Ticket", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useAssignTicketByIdMutation,
} = ticketsApi;
