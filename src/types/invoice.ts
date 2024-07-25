export interface IInvoice {
  _id: string;
  user: string;
  subscription: string;
  description?: string;
  transactionid?: string;
  invoiceNumber?: string;
  trxref?: string;
  createdAt: string;
  updatedAt: string;
}
