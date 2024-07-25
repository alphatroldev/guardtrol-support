import baseApi from "./baseApi";
import { IOrganization } from "../types/organization";

export const organizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: ({ page, limit }) => `organizations?page=${page}&limit=${limit}`,
    }),
    getOrganizationById: builder.query<IOrganization, string>({
      query: (id) => `organizations/${id}`,
    }),
    createOrganization: builder.mutation<IOrganization, Partial<IOrganization>>(
      {
        query: (organization) => ({
          url: "organizations",
          method: "POST",
          body: organization,
        }),
      }
    ),
    updateOrganization: builder.mutation<
      IOrganization,
      { id: string; data: Partial<IOrganization> }
    >({
      query: ({ id, data }) => ({
        url: `organizations/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteOrganization: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `organizations/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationApi;
