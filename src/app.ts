import express from "express";
import { bootstrap } from "./container.js";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import getPrisma from "./database/prisma.js";

export function createApp() {
  const ctx = bootstrap();

  const prisma = getPrisma();

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

  return { app, ctx };
}
