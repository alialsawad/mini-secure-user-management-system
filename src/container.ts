import config from "./config/index.js";
import logger from "./shared/logger.js";

export function bootstrap() {
  return { config, logger };
}
