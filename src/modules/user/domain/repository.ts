import { IPublicUser } from "./user.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<IPublicUser | null>;

  findByUsername(username: string): Promise<IPublicUser | null>;

  findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<IPublicUser | null>;

  create(data: {
    username: string;
    email: string;
    password: string;
    role: string;
  }): Promise<IPublicUser>;
}
