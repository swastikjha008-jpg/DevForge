import type { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Express does not forward a rejected promise from an async handler to
 * `next()` automatically. Wrapping every controller in this closes that gap
 * so every thrown AppError (or unexpected exception) reaches error.middleware.
 */
export function asyncHandler(handler: AsyncRequestHandler): RequestHandler {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
}
