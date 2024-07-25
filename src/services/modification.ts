import baseApi from "./baseApi";
import { IModification } from "../types/modification";

export const modificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getModifications: builder.query<IModification[], void>({
      query: () => "modifications",
    }),
    getModificationById: builder.query<IModification, string>({
      query: (id) => `modifications/${id}`,
    }),
    createModification: builder.mutation<IModification, Partial<IModification>>(
      {
        query: (modification) => ({
          url: "modifications",
          method: "POST",
          body: modification,
        }),
      }
    ),
    updateModification: builder.mutation<
      IModification,
      { id: string; data: Partial<IModification> }
    >({
      query: ({ id, data }) => ({
        url: `modifications/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteModification: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `modifications/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetModificationsQuery,
  useGetModificationByIdQuery,
  useCreateModificationMutation,
  useUpdateModificationMutation,
  useDeleteModificationMutation,
} = modificationApi;
