import { z } from "zod";
import { MAX_FILE_CONTENT_LENGTH, MAX_PROJECT_FILES, PROMPT_MAX_LENGTH, PROMPT_MIN_LENGTH } from "../constants/limits";

/** Validates the incoming POST /api/generate request body. */
export const generateRequestSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(PROMPT_MIN_LENGTH, `Prompt must be at least ${PROMPT_MIN_LENGTH} characters.`)
    .max(PROMPT_MAX_LENGTH, `Prompt must be at most ${PROMPT_MAX_LENGTH} characters.`),
});

export type GenerateRequestInput = z.infer<typeof generateRequestSchema>;

/** Validates the structured JSON the AI provider is expected to return. */
export const projectFileSchema = z.object({
  path: z.string().min(1).max(500),
  content: z.string().max(MAX_FILE_CONTENT_LENGTH),
});

export const generatedProjectPlanSchema = z.object({
  projectName: z.string().min(1).max(100),
  folders: z.array(z.string().max(500)).max(MAX_PROJECT_FILES).default([]),
  files: z.array(projectFileSchema).min(1).max(MAX_PROJECT_FILES),
});

export type GeneratedProjectPlanInput = z.infer<typeof generatedProjectPlanSchema>;
