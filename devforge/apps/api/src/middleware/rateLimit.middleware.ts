import rateLimit from "express-rate-limit";
import { GENERATE_RATE_LIMIT_MAX, GENERATE_RATE_LIMIT_WINDOW_MS } from "../constants/limits";
import { AppError } from "../utils/app-error";

/**
 * Applied only to POST /api/generate — the expensive, AI-backed route.
 * Static/download routes are not rate-limited here.
 */
export const generateRateLimiter = rateLimit({
  windowMs: GENERATE_RATE_LIMIT_WINDOW_MS,
  limit: GENERATE_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(AppError.rateLimited());
  },
});
