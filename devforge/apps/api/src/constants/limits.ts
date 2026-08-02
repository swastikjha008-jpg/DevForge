export const PROMPT_MIN_LENGTH = 3;
export const PROMPT_MAX_LENGTH = 500;

/** Generation requests allowed per IP within the rate-limit window. */
export const GENERATE_RATE_LIMIT_MAX = 10;
export const GENERATE_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/** How long a generated ZIP stays downloadable before it's evicted from memory. */
export const DOWNLOAD_TTL_MS = 10 * 60 * 1000; // 10 minutes

/** Safety ceiling on how many files a single generated project may contain. */
export const MAX_PROJECT_FILES = 200;

/** Safety ceiling on the size of any single generated file's content. */
export const MAX_FILE_CONTENT_LENGTH = 50_000;

/** How many times the service retries a malformed AI response before failing. */
export const AI_RESPONSE_MAX_RETRIES = 1;
