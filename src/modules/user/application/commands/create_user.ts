import type { IUserRepository } from "../../domain/repository.js";
import type { ILogger } from "../../../../shared/types.js";
import type { IPublicUser } from "../../domain/user.js";
import { ConflictError } from "../../../../helpers/errors.js";
import { hashPassword } from "../../../../helpers/hash.js";

export default function createCreateUserCommand(
  userRepo: IUserRepository,
  logger: ILogger,
) {
  return async (input: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<IPublicUser> => {
    if (await userRepo.findByEmail(input.email)) {
      throw ConflictError("user with this email already exists");
    }

    if (await userRepo.findByUsername(input.username)) {
      throw ConflictError("user with this username already exists");
    }

    const hashedPassword = await hashPassword(input.password);
    const user = await userRepo.create({
      ...input,
      password: hashedPassword,
      role: input.role || "user",
    });

    logger.info("user created", { ...user });

    return user;
  };
}
