import type { IUserRepository } from "./domain/repository.js";
import type { ILogger } from "../../shared/types.js";
import createUserApplication from "./application/index.js";
import createUserHandler from "./infrastructure/http/handler.js";

export default function createUserModule(deps: {
  userRepo: IUserRepository;
  logger: ILogger;
}) {
  const app = createUserApplication(deps.userRepo, deps.logger);
  const handler = createUserHandler(app);

  return { app, handler };
}
