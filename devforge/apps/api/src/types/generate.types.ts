export interface GenerateRequestBody {
  prompt: string;
}

export interface ProjectFile {
  /** Path relative to the project root. Never absolute, never containing "..". */
  path: string;
  content: string;
}

export interface GeneratedProjectPlan {
  projectName: string;
  folders: string[];
  files: ProjectFile[];
}

export interface GenerateSuccessResponse {
  success: true;
  downloadUrl: string;
  projectName: string;
  /** Relative file paths actually written into the ZIP (post path-traversal sanitization). */
  files: string[];
  /** Relative explicit empty-folder paths actually written into the ZIP. */
  folders: string[];
}

export interface GenerateErrorBody {
  code: string;
  message: string;
}

export interface GenerateErrorResponse {
  success: false;
  error: GenerateErrorBody;
}

export type GenerateResponse = GenerateSuccessResponse | GenerateErrorResponse;
