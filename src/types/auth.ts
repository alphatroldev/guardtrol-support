export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}
