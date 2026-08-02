import type { NextFunction, Request, Response } from "express";

/**
 * Logs one line per request on completion: method, path, status, and
 * duration. Never logs request bodies — prompt size is logged separately by
 * the generate controller, which knows what's safe to summarize about its
 * own payload.
 */
export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const startedAt = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    req.log.info(
      {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        durationMs: Math.round(durationMs),
      },
      "request completed",
    );
  });

  next();
}
