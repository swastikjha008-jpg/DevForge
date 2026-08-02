import type { Request, Response } from "express";
import { downloadStoreService } from "../services/download-store.service";
import { AppError } from "../utils/app-error";

export async function downloadController(req: Request, res: Response): Promise<void> {
  const { token } = req.params;
  if (!token) {
    throw AppError.notFound();
  }
  const fileToken = token.replace(/\.zip$/i, "");

  const entry = downloadStoreService.get(fileToken);
  if (!entry) {
    throw AppError.notFound("This download link has expired or does not exist. Please generate the project again.");
  }

  req.log.info({ projectName: entry.projectName }, "serving download");

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", `attachment; filename="${entry.projectName}.zip"`);
  res.setHeader("Content-Length", entry.buffer.length.toString());
  res.status(200).send(entry.buffer);
}
