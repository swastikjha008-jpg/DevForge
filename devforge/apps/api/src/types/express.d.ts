import type { Logger } from "pino";

declare global {
  namespace Express {
    interface Request {
      /** Unique id assigned per request by request.middleware, used to correlate logs. */
      id: string;
      /** Child logger pre-bound with this request's id. */
      log: Logger;
    }
  }
}

export {};
