import type { ErrorCodeValue } from "../constants/error-codes";
import { ErrorMessage } from "../constants/error-codes";

/**
 * The only error type application code should throw deliberately. It carries
 * an HTTP status, a machine-readable code, and a message that is always safe
 * to show a client. Anything that isn't an AppError (a bug, an unexpected
 * exception from a library) is treated by error.middleware as an unknown
 * failure and never has its message forwarded to the client.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCodeValue;
  /** Marks this as an expected, handled failure rather than a programming bug. */
  public readonly isOperational = true;

  constructor(statusCode: number, code: ErrorCodeValue, message?: string) {
    super(message ?? ErrorMessage[code]);
    this.statusCode = statusCode;
    this.code = code;
    this.name = "AppError";
    Error.captureStackTrace(this, AppError);
  }

  static validation(message?: string): AppError {
    return new AppError(400, "VALIDATION_ERROR", message);
  }

  static generationFailed(message?: string): AppError {
    return new AppError(502, "GENERATION_FAILED", message);
  }

  static rateLimited(message?: string): AppError {
    return new AppError(429, "RATE_LIMITED", message);
  }

  static notFound(message?: string): AppError {
    return new AppError(404, "NOT_FOUND", message);
  }

  static internal(message?: string): AppError {
    return new AppError(500, "INTERNAL_ERROR", message);
  }
}
