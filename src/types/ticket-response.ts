import { IUser } from "./auth";

export interface ITicketResponse {
  ticket: string;
  message: string;
  author: IUser;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
