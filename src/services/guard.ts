import baseApi from "./baseApi";
import { IGuard } from "../types/guard";
import { PaginatedResponse } from "../types/Statics";

export const guardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGuards: builder.query<PaginatedResponse<IGuard[]>, any>({
      query: (params) => ({ url: `guards`, params }),
    }),
    getGuardById: builder.query<IGuard, string>({
      query: (id) => `guards/${id}`,
    }),
    createGuard: builder.mutation<IGuard, Partial<IGuard>>({
      query: (guard) => ({
        url: "guards",
        method: "POST",
        body: guard,
      }),
    }),
    updateGuard: builder.mutation<
      IGuard,
      { id: string; data: Partial<IGuard> }
    >({
      query: ({ id, data }) => ({
        url: `guards/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteGuard: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `guards/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetGuardsQuery,
  useGetGuardByIdQuery,
  useCreateGuardMutation,
  useUpdateGuardMutation,
  useDeleteGuardMutation,
} = guardApi;
