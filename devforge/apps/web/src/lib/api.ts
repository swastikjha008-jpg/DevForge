import type { GenerateResponse } from "@devforge/shared";

/**
 * Base URL of the DevForge API. Defaults to the local dev server; set
 * NEXT_PUBLIC_API_URL in production (e.g. apps/web/.env.local) to point at
 * the deployed backend.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export class GenerateRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GenerateRequestError";
  }
}

/**
 * Calls POST /api/generate. Throws GenerateRequestError with a message
 * that's always safe to show a user — the backend guarantees its error
 * responses never contain stack traces or provider detail.
 */
export async function generateProject(
  prompt: string,
): Promise<{ downloadUrl: string; projectName: string; files: string[]; folders: string[] }> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
  } catch {
    throw new GenerateRequestError("Couldn't reach the server. Check your connection and try again.");
  }

  const data = (await response.json().catch(() => null)) as GenerateResponse | null;

  if (!data || !data.success) {
    throw new GenerateRequestError(data?.error?.message ?? "Unable to generate your project. Please try again.");
  }

  return { downloadUrl: data.downloadUrl, projectName: data.projectName, files: data.files, folders: data.folders };
}

/** Full URL to fetch a previously generated ZIP. */
export function resolveDownloadUrl(downloadUrl: string): string {
  return `${API_BASE_URL}${downloadUrl}`;
}
