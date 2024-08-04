export interface IUser {
  _id: string;
  username: string;
  name: string;
  email: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}
