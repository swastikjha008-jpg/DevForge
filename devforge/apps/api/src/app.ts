import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { env } from "./config/env";
import { requestMiddleware } from "./middleware/request.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import { apiRouter } from "./routes";
import { AppError } from "./utils/app-error";

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      methods: ["GET", "POST"],
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: "100kb" }));

  app.use(requestMiddleware);
  app.use(loggerMiddleware);

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use(apiRouter);

  // Anything that falls through every route is a 404 — routed through the
  // same AppError -> errorMiddleware path as every other error.
  app.use((_req, _res, next) => {
    next(AppError.notFound());
  });

  app.use(errorMiddleware);

  return app;
}
