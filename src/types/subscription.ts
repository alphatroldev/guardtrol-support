export interface ISubscription {
  _id: string;
  user: string;
  plan?: string;
  maxbeats: number;
  maxextraguards?: number;
  totalamount: number;
  paymentstatus: "pending" | "complete";
  paymentgateway?: "flutterwave" | "paystack";
  transactionid?: string;
  createdat: string;
  updatedat: string;
  expiresat: string;
  startsAt?: string;
  paymentlog?: any;
}
