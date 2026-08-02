import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodSchema } from "zod";
import { AppError } from "../utils/app-error";

/**
 * Validates `req.body` against the given schema and replaces it with the
 * parsed (and thus type-safe, defaulted, coerced) value. On failure, throws
 * a single AppError summarizing the first validation issue rather than
 * leaking the full Zod error structure to the client.
 */
export function validateBody(schema: ZodSchema): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      const message = firstIssue ? `${firstIssue.path.join(".") || "body"}: ${firstIssue.message}` : "Invalid request body.";
      next(AppError.validation(message));
      return;
    }

    req.body = result.data;
    next();
  };
}
