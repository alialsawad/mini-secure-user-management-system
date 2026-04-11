import express from "express";
import { bootstrap } from "./container.js";

export function createApp() {
  const ctx = bootstrap();

  const app = express();

  return { app, ctx };
}
