/**
 * Every error code the API is allowed to send to a client. Keeping this as
 * a const object (not a free-form string) means a typo can't silently
 * invent a new, undocumented error code.
 */
export const ErrorCode = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  GENERATION_FAILED: "GENERATION_FAILED",
  RATE_LIMITED: "RATE_LIMITED",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCodeValue = (typeof ErrorCode)[keyof typeof ErrorCode];

/** Generic, user-safe message per error code. Never includes provider or stack detail. */
export const ErrorMessage: Record<ErrorCodeValue, string> = {
  VALIDATION_ERROR: "Your request could not be processed. Please check your input and try again.",
  GENERATION_FAILED: "Unable to generate your project. Please try again.",
  RATE_LIMITED: "Too many requests. Please wait a moment before trying again.",
  NOT_FOUND: "The requested resource could not be found or has expired.",
  INTERNAL_ERROR: "Something went wrong on our end. Please try again.",
};
