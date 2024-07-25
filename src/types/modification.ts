export interface IModification {
  _id: string;
  type: string;
  guard: string;
  beat: string;
  previousState: any;
  reminder: string;
  newState: any;
  status: "pending" | "approved" | "reverted" | "no-response";
  expiresAt: string;
  organization: string;
  performer: string;
  createdAt: string;
  updatedAt: string;
}
