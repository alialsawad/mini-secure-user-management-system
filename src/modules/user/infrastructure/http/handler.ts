import type { Request, Response, NextFunction } from "express";
import type { UserApplication } from "../../application/index.js";
import { created } from "../../../../helpers/response.js";

export default function createUserHandler(app: UserApplication) {
  return {
    create: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await app.commands.createUser(req.body);

        created(res, user, "user created");
      } catch (err) {
        next(err);
      }
    },
  };
}

export type UserHandler = ReturnType<typeof createUserHandler>;
