/**
 * Contract shared between apps/web and apps/api for the project-generation
 * flow. Keeping this in one place means the frontend and backend can never
 * silently drift apart on request/response shape.
 */

/** Body accepted by POST /api/generate. */
export interface GenerateRequestBody {
  prompt: string;
}

/** A single file to be written into the generated project archive. */
export interface ProjectFile {
  /** Path relative to the project root, e.g. "src/index.ts". Never absolute, never containing "..". */
  path: string;
  content: string;
}

/**
 * The structured shape the AI provider must return, validated before any
 * further processing happens. `folders` is optional — a project can be
 * fully described by its file paths, but explicit empty-folder entries are
 * supported for scaffolding purposes (e.g. an empty `uploads/` directory).
 */
export interface GeneratedProjectPlan {
  projectName: string;
  folders: string[];
  files: ProjectFile[];
}

/** Successful response from POST /api/generate. */
export interface GenerateSuccessResponse {
  success: true;
  downloadUrl: string;
  projectName: string;
  /** Relative file paths actually written into the ZIP (post path-traversal sanitization). */
  files: string[];
  /** Relative explicit empty-folder paths actually written into the ZIP. */
  folders: string[];
}

/** Machine-readable error codes the API is allowed to return. */
export type GenerateErrorCode =
  | "VALIDATION_ERROR"
  | "GENERATION_FAILED"
  | "RATE_LIMITED"
  | "NOT_FOUND"
  | "INTERNAL_ERROR";

export interface GenerateErrorBody {
  code: GenerateErrorCode;
  message: string;
}

/** Failure response from POST /api/generate (and other API routes). */
export interface GenerateErrorResponse {
  success: false;
  error: GenerateErrorBody;
}

export type GenerateResponse = GenerateSuccessResponse | GenerateErrorResponse;
