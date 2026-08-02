import { Router } from "express";
import { generateController } from "../controllers/generate.controller";
import { validateBody } from "../middleware/validation.middleware";
import { generateRateLimiter } from "../middleware/rateLimit.middleware";
import { asyncHandler } from "../utils/async-handler";
import { generateRequestSchema } from "../validators/generate.validator";

export const generateRouter = Router();

generateRouter.post("/generate", generateRateLimiter, validateBody(generateRequestSchema), asyncHandler(generateController));
