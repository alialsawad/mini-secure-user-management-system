export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IPublicUser = Omit<IUser, "password">;

export function toPublicUser(u: IUser | IPublicUser): IPublicUser {
  return {
    id: u.id,
    username: u.username,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}
