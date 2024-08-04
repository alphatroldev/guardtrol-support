import baseApi from "./baseApi";
import { IInvoice } from "../types/invoice";
import { PaginatedResponse } from "../types/Statics";

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<PaginatedResponse<IInvoice[]>, any>({
      query: (params) => ({ url: "invoices", params }),
    }),
    getInvoiceById: builder.query<IInvoice, string>({
      query: (id) => `invoices/${id}`,
    }),
    createInvoice: builder.mutation<IInvoice, Partial<IInvoice>>({
      query: (invoice) => ({
        url: "invoices",
        method: "POST",
        body: invoice,
      }),
    }),
    updateInvoice: builder.mutation<
      IInvoice,
      { id: string; data: Partial<IInvoice> }
    >({
      query: ({ id, data }) => ({
        url: `invoices/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteInvoice: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `invoices/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
