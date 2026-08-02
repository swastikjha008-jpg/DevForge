import pino from "pino";
import { env, isProduction } from "../config/env";

/**
 * Single root logger for the process. Never log the API key or full prompt
 * text — only prompt length. `redact` is a defense-in-depth backstop in case
 * a future field name collides with something sensitive.
 */
export const logger = pino({
  level: env.LOG_LEVEL,
  redact: {
    paths: ["*.apiKey", "*.GEMINI_API_KEY", "req.headers.authorization"],
    censor: "[redacted]",
  },
  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: { colorize: true, translateTime: "HH:MM:ss", ignore: "pid,hostname" },
      },
});
