import type { Request, Response, NextFunction } from "express";
import type { ILogger } from "../shared/types.js";
import { isAppError } from "../helpers/errors.js";

export default function createErrorHandler(logger: ILogger) {
  return function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const isAppErr = isAppError(err);
    const statusCode = isAppErr ? err.statusCode : 500;

    logger.error("api error", {
      method: req.method,
      url: req.originalUrl,
      statusCode,
      message: err.message,
      stack: err.stack,
      ip: req.ip,
    });

    if (isAppErr) {
      return res.status(statusCode).json({
        success: false,
        message: err.message,
        ...(err.errors ? { errors: err.errors } : {}),
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  };
}
