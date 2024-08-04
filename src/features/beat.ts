import baseApi from "./baseApi";
import { IBeat } from "../types/beat";
import { PaginatedResponse } from "../types/Statics";

export const beatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBeats: builder.query<PaginatedResponse<IBeat[]>, any>({
      query: (params) => ({
        url: `beats`,
        params,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Beats" as const,
                id: _id,
              })),
              { type: "Beats", id: "LIST" },
            ]
          : [{ type: "Beats", id: "LIST" }],
    }),
    getBeatById: builder.query<IBeat, string>({
      query: (id) => `beats/${id}`,
      providesTags: (result, error, id) => [{ type: "Beats", id }],
    }),
    createBeat: builder.mutation<{ success: boolean }, Partial<any>>({
      query: ({ organizationId, data }) => ({
        url: `beats/${organizationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Beats", id: "LIST" }],
    }),
    updateBeat: builder.mutation<IBeat, { id: string; data: Partial<IBeat> }>({
      query: ({ id, data }) => ({
        url: `beats/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Beats", id }],
    }),
    deleteBeat: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `beats/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Beats", id }],
    }),
  }),
});

export const {
  useGetBeatsQuery,
  useGetBeatByIdQuery,
  useCreateBeatMutation,
  useUpdateBeatMutation,
  useDeleteBeatMutation,
} = beatApi;
