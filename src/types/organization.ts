export interface IOrganization {
  _id: string;
  name: string;
  password?: string;
  roles: string[];
  isOwner: boolean;
  email: string;
  address?: string;
  subAccount: boolean;
  emailverified: boolean;
  temporarycode?: number;
  role?: string;
  phone?: string;
  whatsappNumber?: string;
  image: string;
  resetToken?: string;
  resetTokenExpiration?: string;
  clientid: string;
  onboardingcomplete: boolean;
  subscriptions: string[];
  beats: string[];
  assignedBeats: string[];
  users: string[];
  guards: string[];
  organization?: string;
  createdAt: string;
  updatedAt: string;
}
