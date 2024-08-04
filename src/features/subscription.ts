import baseApi from "./baseApi";
import { ISubscription } from "../types/subscription";
import { PaginatedResponse } from "../types/Statics";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<PaginatedResponse<ISubscription[]>, any>({
      query: (params) => ({ url: `subscriptions`, params }),
    }),
    getSubscriptionById: builder.query<ISubscription, string>({
      query: (id) => `subscriptions/${id}`,
    }),
    createSubscription: builder.mutation<{ success: boolean }, Partial<any>>({
      query: ({ organizationId, data }) => ({
        url: `subscriptions/${organizationId}`,
        method: "POST",
        body: data,
      }),
    }),
    updateSubscription: builder.mutation<
      ISubscription,
      { id: string; data: Partial<ISubscription> }
    >({
      query: ({ id, data }) => ({
        url: `subscriptions/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteSubscription: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `subscriptions/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
