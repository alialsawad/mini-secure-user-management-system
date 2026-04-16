import config from "./config/index.js";
import getPrisma from "./database/prisma.js";
import createUserRepository from "./modules/user/infrastructure/postgres/repository.js";
import createUserModule from "./modules/user/module.js";
import logger from "./shared/logger.js";

export function bootstrap() {
  const prisma = getPrisma();

  const userRepo = createUserRepository(prisma);
  const userModule = createUserModule({ userRepo, logger });

  return { config, logger, prisma, userHandler: userModule.handler };
}
