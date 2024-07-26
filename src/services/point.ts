import baseApi from "./baseApi";
import { IPoint } from "../types/point";
import { PaginatedResponse } from "../types/Statics";

export const pointApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPoints: builder.query<PaginatedResponse<IPoint[]>, any>({
      query: (params) => ({ url: "points", params }),
    }),
    getPointById: builder.query<IPoint, string>({
      query: (id) => `points/${id}`,
    }),
    createPoint: builder.mutation<IPoint, Partial<IPoint>>({
      query: (point) => ({
        url: "points",
        method: "POST",
        body: point,
      }),
    }),
    updatePoint: builder.mutation<
      IPoint,
      { id: string; data: Partial<IPoint> }
    >({
      query: ({ id, data }) => ({
        url: `points/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePoint: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `points/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPointsQuery,
  useGetPointByIdQuery,
  useCreatePointMutation,
  useUpdatePointMutation,
  useDeletePointMutation,
} = pointApi;
