import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";
import { AppError } from "../utils/app-error";
import type { AIProvider } from "../types/provider.types";

const SYSTEM_INSTRUCTION = `You are a code generation engine for DevForge, a tool that turns a short natural-language
description into a small, runnable starter project. Given a user's prompt, respond with ONLY a JSON object matching
this exact shape, and nothing else — no markdown fences, no commentary:

{
  "projectName": string,   // short kebab-case name, e.g. "weather-app"
  "folders": string[],     // relative folder paths to create (may be empty)
  "files": [
    { "path": string, "content": string } // relative file paths and their full text content
  ]
}

Guidelines:
- Keep the project small and focused: prefer 5-20 files over an exhaustive scaffold.
- Every path must be relative (no leading slash) and must never contain "..".
- Include a README.md explaining how to run the project.
- Include real, working code appropriate to the request — not placeholders like "TODO".
- Do not include secrets or API keys in generated files; use a .env.example instead where relevant.`;

/**
 * The only file in this codebase that imports the Gemini SDK. Every other
 * layer depends on the AIProvider interface, so swapping in a different
 * model or vendor later means writing one new class here — GenerateService,
 * the controller, and the routes never change.
 */
export class GeminiProvider implements AIProvider {
  private readonly client: GoogleGenerativeAI;

  constructor(apiKey: string = env.GEMINI_API_KEY) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generateProjectPlan(prompt: string): Promise<unknown> {
    const model = this.client.getGenerativeModel({
      model: env.GEMINI_MODEL,
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    let rawText: string;
    try {
      const result = await model.generateContent(prompt);
      rawText = result.response.text();
    } catch {
      // Never forward the underlying provider error message to callers.
      throw AppError.generationFailed();
    }

    try {
      return JSON.parse(rawText);
    } catch {
      // The model didn't return valid JSON despite JSON mode being requested.
      throw AppError.generationFailed();
    }
  }
}
