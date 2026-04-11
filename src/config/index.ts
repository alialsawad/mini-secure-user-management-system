import "dotenv/config";
import type { IConfig } from "../shared/types.js";

const config: IConfig = {
  env: process.env.NODE_ENV ?? "development",
  port: parseInt(process.env.PORT ?? "3000", 10),
};

export default config;
