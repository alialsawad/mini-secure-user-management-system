import type { Logger } from "winston";

export interface IConfig {
  env: string;
  port: number;
  logLevel: string;
}

export type ILogger = Logger;
