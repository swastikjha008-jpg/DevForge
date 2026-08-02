import { v4 as uuidv4 } from "uuid";
import type { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";

/**
 * Must run before logger.middleware and every route — everything downstream
 * assumes `req.id` and `req.log` already exist.
 */
export function requestMiddleware(req: Request, res: Response, next: NextFunction): void {
  const incomingId = req.header("x-request-id");
  req.id = incomingId && incomingId.length > 0 ? incomingId : uuidv4();
  req.log = logger.child({ requestId: req.id });
  res.setHeader("x-request-id", req.id);
  next();
}
