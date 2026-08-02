import type { NextFunction, Request, Response } from "express";
import { ErrorCode, ErrorMessage } from "../constants/error-codes";
import { AppError } from "../utils/app-error";
import type { GenerateErrorResponse } from "../types/generate.types";

/**
 * The single place in the codebase that turns an Error into an HTTP
 * response. Every route relies on this instead of handling errors locally.
 *
 * Contract with the rest of the app: only AppError instances are trusted to
 * carry a client-safe message. Anything else — a bug, a library throwing
 * something unexpected — is logged in full server-side and reduced to a
 * generic INTERNAL_ERROR for the client. Stack traces, provider errors, and
 * raw exception messages never cross this boundary.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Express requires 4 params to recognize an error handler.
export function errorMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      req.log.error({ err, code: err.code }, "operational error (5xx)");
    } else {
      req.log.warn({ code: err.code, message: err.message }, "operational error (4xx)");
    }

    const body: GenerateErrorResponse = {
      success: false,
      error: { code: err.code, message: err.message },
    };
    res.status(err.statusCode).json(body);
    return;
  }

  // Unknown/unexpected error: log everything server-side, reveal nothing to the client.
  req.log.error({ err }, "unhandled error");

  const body: GenerateErrorResponse = {
    success: false,
    error: { code: ErrorCode.INTERNAL_ERROR, message: ErrorMessage.INTERNAL_ERROR },
  };
  res.status(500).json(body);
}
