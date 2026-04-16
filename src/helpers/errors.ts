export function createAppError(
  message: string,
  statusCode: number,
  errors: unknown[] | null = null,
) {
  const err = new Error(message) as Error & {
    statusCode: number;
    isOperational: boolean;
    errors: unknown[] | null;
  };
  err.name = "AppError";
  err.statusCode = statusCode;
  err.isOperational = true;
  err.errors = errors;
  Error.captureStackTrace(err, createAppError);
  return err;
}

export type AppError = ReturnType<typeof createAppError>;

export function NotFoundError(resource = "resource", id = "") {
  const err = createAppError(
    `${resource}${id ? ` with id ${id}` : ""} not found`,
    404,
  );
  err.name = "NotFoundError";
  return err;
}

export function ConflictError(message = "resource already exists") {
  const err = createAppError(message, 409);
  err.name = "ConflictError";
  return err;
}

export function UnauthorizedError(message = "authentication required") {
  const err = createAppError(message, 401);
  err.name = "UnauthorizedError";
  return err;
}

export function ForbiddenError(message = "forbidden") {
  const err = createAppError(message, 403);
  err.name = "ForbiddenError";
  return err;
}

export function ValidationError(
  message = "validation failed",
  errors: unknown[] = [],
) {
  const err = createAppError(message, 422, errors);
  err.name = "ValidationError";
  return err;
}

export function isAppError(err: unknown): err is AppError {
  return (
    typeof err === "object" &&
    err !== null &&
    "isOperational" in err &&
    (err as AppError).isOperational === true
  );
}
