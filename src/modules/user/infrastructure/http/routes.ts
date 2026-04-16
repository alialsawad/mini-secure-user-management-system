import { Router } from "express";
import type { UserHandler } from "./handler.js";
import validate from "../../../../middleware/validate.js";
import { createUserSchema } from "./schema.js";

export default function createUserRoutes(deps: { userHandler: UserHandler }) {
  const router = Router();

  router.post("/", validate(createUserSchema), deps.userHandler.create);

  return router;
}
