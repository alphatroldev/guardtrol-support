import baseApi from "./baseApi";
import { IPatrol } from "../types/patrol";
import { PaginatedResponse } from "../types/Statics";

export const patrolApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatrols: builder.query<PaginatedResponse<IPatrol[]>, any>({
      query: (params) => ({ url: "patrols", params }),
    }),
    getPatrolById: builder.query<IPatrol, string>({
      query: (id) => `patrols/${id}`,
    }),
    createPatrol: builder.mutation<IPatrol, Partial<IPatrol>>({
      query: (patrol) => ({
        url: "patrols",
        method: "POST",
        body: patrol,
      }),
    }),
    updatePatrol: builder.mutation<
      IPatrol,
      { id: string; data: Partial<IPatrol> }
    >({
      query: ({ id, data }) => ({
        url: `patrols/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePatrol: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `patrols/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPatrolsQuery,
  useGetPatrolByIdQuery,
  useCreatePatrolMutation,
  useUpdatePatrolMutation,
  useDeletePatrolMutation,
} = patrolApi;
