import type { Logger } from "winston";

export interface IConfig {
  env: string;
  port: number;
}

export type ILogger = Logger;
