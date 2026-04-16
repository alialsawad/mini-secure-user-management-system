import type { PrismaClient } from "../../../../generated/prisma/client.js";
import type { IUserRepository } from "../../domain/repository.js";
import type { IPublicUser } from "../../domain/user.js";

const publicSelect = {
  id: true,
  username: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

export default function createUserRepository(
  prisma: PrismaClient,
): IUserRepository {
  const findByEmail = async (email: string): Promise<IPublicUser | null> => {
    return prisma.user.findUnique({
      where: { email },
      select: publicSelect,
    });
  };

  const findByUsername = async (
    username: string,
  ): Promise<IPublicUser | null> => {
    const user = await prisma.user.findUnique({
      where: { username },
      select: publicSelect,
    });

    return user;
  };

  return {
    create: (data): Promise<IPublicUser> => {
      const user = prisma.user.create({ data, select: publicSelect });

      return user;
    },

    findByEmail,
    findByUsername,

    findByEmailOrUsername: async (
      email,
      username,
    ): Promise<IPublicUser | null> => {
      let user = await findByEmail(email);

      if (user) return user;

      user = await findByUsername(username);

      return user;
    },
  };
}
