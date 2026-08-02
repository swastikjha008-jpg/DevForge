import { Router } from "express";
import { downloadController } from "../controllers/download.controller";
import { asyncHandler } from "../utils/async-handler";

export const downloadRouter = Router();

downloadRouter.get("/:token", asyncHandler(downloadController));
