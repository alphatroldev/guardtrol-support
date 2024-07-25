import baseApi from "./baseApi";
import { ISubscription } from "../types/subscription";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: ({ page, limit }) => `subscription?page=${page}&limit=${limit}`,
    }),
    getSubscriptionById: builder.query<ISubscription, string>({
      query: (id) => `subscription/${id}`,
    }),
    createSubscription: builder.mutation<ISubscription, Partial<ISubscription>>(
      {
        query: (subscription) => ({
          url: "subscription",
          method: "POST",
          body: subscription,
        }),
      }
    ),
    updateSubscription: builder.mutation<
      ISubscription,
      { id: string; data: Partial<ISubscription> }
    >({
      query: ({ id, data }) => ({
        url: `subscription/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteSubscription: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `subscription/${id}`,
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
