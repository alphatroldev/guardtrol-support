import { IFaqCategories } from "./faq-categories";

export interface IFaq {
  _id?: string;
  category: string;
  question: string;
  answer: string;
}
export interface IFaqApiResponse {
  category: IFaqCategories;
  faqs: IFaq[];
}
