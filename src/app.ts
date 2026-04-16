import express from "express";
import { bootstrap } from "./container.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import createUserRoutes from "./modules/user/infrastructure/http/routes.js";
import createErrorHandler from "./core/error_handler.js";

export function createApp() {
  const ctx = bootstrap();

  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(
    morgan("combined", {
      stream: {
        write: (msg) => ctx.logger.info(msg.trim(), { component: "http" }),
      },
    }),
  );

  app.use("/api/users", createUserRoutes({ userHandler: ctx.userHandler }));

  app.use((_req, res) =>
    res.status(404).json({ success: false, message: "not found" }),
  );
  app.use(createErrorHandler(ctx.logger));

  return { app, ctx };
}
