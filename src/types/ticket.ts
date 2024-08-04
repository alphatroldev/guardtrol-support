import { IUser } from "./auth";
import { ITicketCategories } from "./ticket-categories";

export interface ITicket {
  category?: ITicketCategories;
  _id: string;
  subject: string;
  status: string;
  description: string;
  author?: IUser;
  assignedTo?: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface ITicketForm {
  category?: string;
  subject: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
