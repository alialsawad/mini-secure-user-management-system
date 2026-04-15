import "dotenv/config";
import http from "http";
import { createApp } from "./src/app.js";

const { app, ctx } = createApp();

const server = http.createServer(app);

server.listen(ctx.config.port, () => {
  console.log("server started");
});
