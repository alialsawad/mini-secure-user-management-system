import type { IUserRepository } from "../domain/repository.js";
import type { ILogger } from "../../../shared/types.js";
import createCreateUserCommand from "./commands/create_user.js";

export default function createUserApplication(
  userRepo: IUserRepository,
  logger: ILogger,
) {
  return {
    commands: {
      createUser: createCreateUserCommand(userRepo, logger),
    },
    queries: {},
  };
}

export type UserApplication = ReturnType<typeof createUserApplication>;
