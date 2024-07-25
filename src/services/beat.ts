import baseApi from "./baseApi";
import { IBeat } from "../types/beat";

export const beatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBeats: builder.query({
      query: ({ page, limit }) => `beats?page=${page}&limit=${limit}`,
    }),
    getBeatById: builder.query<IBeat, string>({
      query: (id) => `beats/${id}`,
    }),
    createBeat: builder.mutation<IBeat, Partial<IBeat>>({
      query: (beat) => ({
        url: "beats",
        method: "POST",
        body: beat,
      }),
    }),
    updateBeat: builder.mutation<IBeat, { id: string; data: Partial<IBeat> }>({
      query: ({ id, data }) => ({
        url: `beats/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteBeat: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `beats/${id}`,
        method: "DELETE",
      }),
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
