import baseApi from "./baseApi";
import { IOrganization } from "../types/organization";
import { PaginatedResponse } from "../types/Statics";

export const organizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<PaginatedResponse<IOrganization[]>, any>({
      query: (params) => ({
        url: `organizations`,
        params,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result?.data?.map(({ _id }) => ({
                type: "Organization" as const,
                id: _id,
              })),
              { type: "Organization", id: "LIST" },
            ]
          : [{ type: "Organization", id: "LIST" }],
    }),
    getOrganizationById: builder.query<IOrganization, string>({
      query: (id) => `organizations/${id}`,
      providesTags: (result, error, id) => [{ type: "Organization", id }],
    }),
    createOrganization: builder.mutation<IOrganization, Partial<IOrganization>>(
      {
        query: (organization) => ({
          url: "organizations",
          method: "POST",
          body: organization,
        }),
        invalidatesTags: [{ type: "Organization", id: "LIST" }],
      }
    ),

    updateOrganization: builder.mutation<
      { success: boolean },
      { id: string; data: Partial<IOrganization> }
    >({
      query: ({ id, data }) => ({
        url: `organizations/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Organization", id },
      ],
    }),
    updateOrganizationStatus: builder.mutation<
      { success: boolean },
      { id: string; data: { status: string } }
    >({
      query: ({ id, data }) => ({
        url: `organizations/status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Organization", id },
      ],
    }),
    resetOrganizationPassword: builder.mutation<
      { success: boolean },
      { id: string; data: Partial<IOrganization> }
    >({
      query: ({ id, data }) => ({
        url: `organizations/reset-password/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Organization", id },
      ],
    }),
    deleteOrganization: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `organizations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Organization", id }],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useResetOrganizationPasswordMutation,
  useUpdateOrganizationStatusMutation,
} = organizationApi;
