import archiver from "archiver";
import { PassThrough } from "node:stream";
import { toSafeRelativePath } from "../utils/safe-filename";
import { AppError } from "../utils/app-error";
import type { ProjectFile } from "../types/generate.types";

/**
 * Builds a ZIP archive entirely in memory (no temp files on disk) from a
 * project name, an optional list of folders, and a list of files. Every
 * entry path is re-validated here — even though the plan was already
 * schema-validated upstream — because this is the last point before bytes
 * are written into an archive, and defense-in-depth against path traversal
 * belongs at the boundary that actually writes files.
 */
export interface ZipBuildResult {
  buffer: Buffer;
  /** Relative, project-root-stripped paths of every file actually written into the archive — the ground truth for what the ZIP contains. */
  filePaths: string[];
  /** Relative, project-root-stripped paths of explicit empty folders actually written into the archive. */
  folderPaths: string[];
}

/**
 * Builds a ZIP archive entirely in memory (no temp files on disk) from a
 * project name, an optional list of folders, and a list of files. Every
 * entry path is re-validated here — even though the plan was already
 * schema-validated upstream — because this is the last point before bytes
 * are written into an archive, and defense-in-depth against path traversal
 * belongs at the boundary that actually writes files.
 *
 * Returns the exact set of paths that were written (post-sanitization) so
 * callers can report what the project actually contains rather than trusting
 * the AI's raw, unvalidated output.
 */
export async function buildProjectZip(projectName: string, folders: string[], files: ProjectFile[]): Promise<ZipBuildResult> {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const passthrough = new PassThrough();
  const chunks: Buffer[] = [];

  passthrough.on("data", (chunk: Buffer) => chunks.push(chunk));

  const donePromise = new Promise<Buffer>((resolve, reject) => {
    passthrough.on("end", () => resolve(Buffer.concat(chunks)));
    passthrough.on("error", reject);
    archive.on("error", reject);
  });

  archive.pipe(passthrough);

  const folderPaths: string[] = [];
  for (const folder of folders) {
    const safePath = toSafeRelativePath(folder);
    if (safePath) {
      archive.append("", { name: `${projectName}/${safePath}/.gitkeep` });
      folderPaths.push(safePath);
    }
  }

  const filePaths: string[] = [];
  for (const file of files) {
    const safePath = toSafeRelativePath(file.path);
    if (!safePath) {
      continue; // Silently skip unsafe entries rather than fail the whole generation.
    }
    archive.append(file.content, { name: `${projectName}/${safePath}` });
    filePaths.push(safePath);
  }

  if (filePaths.length === 0) {
    throw AppError.generationFailed("The generated project did not contain any valid files.");
  }

  await archive.finalize();
  const buffer = await donePromise;
  return { buffer, filePaths, folderPaths };
}
