export const PROMPT_MIN_LENGTH = 3;
export const PROMPT_MAX_LENGTH = 500;

/** Generation requests allowed per IP within the rate-limit window. */
export const GENERATE_RATE_LIMIT_MAX = 10;
export const GENERATE_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/** How long a generated ZIP stays downloadable before it's evicted from memory. */
export const DOWNLOAD_TTL_MS = 10 * 60 * 1000; // 10 minutes
