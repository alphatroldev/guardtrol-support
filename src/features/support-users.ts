import baseApi from "./baseApi";
import { IUser } from "../types/auth";
import { PaginatedResponse } from "../types/Statics";

export const supportUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupportUsers: builder.query<PaginatedResponse<IUser[]>, any>({
      query: (params) => ({ url: `support-users`, params }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "SupportUsers" as const,
                id: _id,
              })),
              { type: "SupportUsers", id: "LIST" },
            ]
          : [{ type: "SupportUsers", id: "LIST" }],
    }),
    getSupportUserById: builder.query<IUser, string>({
      query: (id) => `support-users/${id}`,
      providesTags: (result, error, id) => [{ type: "SupportUsers", id }],
    }),
    createSupportUser: builder.mutation<{ success: boolean }, Partial<any>>({
      query: (data) => ({
        url: `support-users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "SupportUsers", id: "LIST" }],
    }),
    updateSupportUser: builder.mutation<
      IUser,
      { id: string; data: Partial<IUser> }
    >({
      query: ({ id, data }) => ({
        url: `support-users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "SupportUsers", id: "LIST" }],
    }),
    deleteSupportUser: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `support-users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "SupportUsers", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSupportUsersQuery,
  useGetSupportUserByIdQuery,
  useCreateSupportUserMutation,
  useUpdateSupportUserMutation,
  useDeleteSupportUserMutation,
} = supportUserApi;
