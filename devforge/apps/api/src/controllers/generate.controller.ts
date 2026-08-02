import type { Request, Response } from "express";
import { GenerateService } from "../services/generate.service";
import { GeminiProvider } from "../providers/gemini.provider";
import type { GenerateRequestInput } from "../validators/generate.validator";
import type { GenerateSuccessResponse } from "../types/generate.types";

// A single provider instance is reused across requests — the SDK client is stateless per-call.
const generateService = new GenerateService(new GeminiProvider());

export async function generateController(req: Request, res: Response): Promise<void> {
  const { prompt } = req.body as GenerateRequestInput;

  req.log.info({ promptLength: prompt.length }, "generation requested");

  const result: GenerateSuccessResponse = await generateService.generate(prompt, req.log);

  res.status(200).json(result);
}
