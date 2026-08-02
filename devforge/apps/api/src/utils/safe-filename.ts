const FALLBACK_PROJECT_NAME = "devforge-project";

/**
 * Reduces an arbitrary, AI-generated string to a safe kebab-case slug
 * suitable for use as a project name, a ZIP entry root, or part of a
 * filename. Never throws — always returns a non-empty, filesystem-safe
 * string.
 */
export function toSafeSlug(input: string, fallback = FALLBACK_PROJECT_NAME): string {
  const slug = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return slug.length > 0 ? slug : fallback;
}

/**
 * Validates a single relative file path from AI output before it is ever
 * written into a ZIP archive. Rejects anything that could escape the
 * project root: absolute paths, ".." segments, null bytes, or empty paths.
 * Returns the normalized, safe relative path, or `null` if the input must
 * be rejected outright.
 */
export function toSafeRelativePath(rawPath: string): string | null {
  if (typeof rawPath !== "string" || rawPath.trim().length === 0) {
    return null;
  }

  // Reject null bytes and backslashes outright — no legitimate project file needs them.
  if (rawPath.includes("\0") || rawPath.includes("\\")) {
    return null;
  }

  // Normalize "./a/../b" style segments, then re-check for any that escape the root.
  const segments = rawPath.split("/").filter((segment) => segment.length > 0 && segment !== ".");

  if (segments.some((segment) => segment === "..")) {
    return null;
  }

  // Reject absolute-looking paths (leading slash already stripped by the filter above,
  // but a bare drive letter like "C:" is still worth rejecting defensively).
  if (/^[a-zA-Z]:/.test(rawPath)) {
    return null;
  }

  const normalized = segments.join("/");
  return normalized.length > 0 ? normalized : null;
}
