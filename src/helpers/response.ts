import type { Response } from "express";

export function success(
  res: Response,
  data: unknown,
  message = "ok",
  statusCode = 200,
) {
  return res.status(statusCode).json({ success: true, message, data });
}

export function created(res: Response, data: unknown, message = "created") {
  return success(res, data, message, 201);
}
