import baseApi from "./baseApi";
import { ITicketResponse } from "../types/ticket-response";
import { PaginatedResponse } from "../types/Statics";

export const ticketsResponseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTicketResponses: builder.query<
      PaginatedResponse<ITicketResponse[]>,
      any
    >({
      query: ({ ticket, params }) => ({
        url: `ticket-responses/${ticket}`,
        params,
      }),
      providesTags: (result, error, { ticket }) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "TicketResponse" as const,
                id: _id,
              })),
              { type: "TicketResponse", id: `LIST-${ticket}` },
            ]
          : [{ type: "TicketResponse", id: `LIST-${ticket}` }],
    }),
    getTicketResponseById: builder.query<ITicketResponse, string>({
      query: (id) => `ticket-responses/${id}`,
      providesTags: (result, error, id) => [{ type: "TicketResponse", id }],
    }),
    createTicketResponse: builder.mutation<
      ITicketResponse,
      Partial<ITicketResponse>
    >({
      query: (ticketresponse) => ({
        url: `ticket-responses`,
        method: "POST",
        body: ticketresponse,
      }),
      invalidatesTags: (result, error, { ticket }) => [
        { type: "TicketResponse", id: `LIST-${ticket}` },
        { type: "Ticket", id: ticket },
      ],
    }),
    updateTicketResponse: builder.mutation<
      { success: boolean },
      { id: string; data: Partial<ITicketResponse> }
    >({
      query: ({ id, data }) => ({
        url: `ticket-responses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "TicketResponse", id },
      ],
    }),
    deleteTicketResponse: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `ticket-responses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "TicketResponse", id }],
    }),
  }),
});

export const {
  useGetTicketResponsesQuery,
  useGetTicketResponseByIdQuery,
  useCreateTicketResponseMutation,
  useUpdateTicketResponseMutation,
  useDeleteTicketResponseMutation,
} = ticketsResponseApi;
