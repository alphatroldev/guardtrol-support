export interface IBeat {
  _id: string;
  name: string;
  address?: string;
  description: string;
  lastseen?: string;
  isactive: boolean;
  user: string;
  guards: string[];
  beat?: string;
  hasupdate: boolean;
}
