import { v4 as uuidv4 } from "uuid";
import type { Logger } from "pino";
import { AI_RESPONSE_MAX_RETRIES } from "../constants/limits";
import { AppError } from "../utils/app-error";
import { toSafeSlug } from "../utils/safe-filename";
import { generatedProjectPlanSchema } from "../validators/generate.validator";
import { buildProjectZip } from "./zip.service";
import { downloadStoreService } from "./download-store.service";
import type { AIProvider } from "../types/provider.types";
import type { GenerateSuccessResponse } from "../types/generate.types";

export class GenerateService {
  constructor(private readonly aiProvider: AIProvider) {}

  async generate(prompt: string, log: Logger): Promise<GenerateSuccessResponse> {
    const plan = await this.getValidatedPlan(prompt, log);

    const projectName = toSafeSlug(plan.projectName);
    const { buffer, filePaths, folderPaths } = await buildProjectZip(projectName, plan.folders, plan.files);

    const token = uuidv4();
    downloadStoreService.put(token, buffer, projectName);

    log.info({ projectName, fileCount: filePaths.length }, "project generated successfully");

    return {
      success: true,
      downloadUrl: `/downloads/${token}.zip`,
      projectName,
      files: filePaths,
      folders: folderPaths,
    };
  }

  /**
   * Calls the AI provider and validates its output against the expected
   * schema. Retries exactly once on a malformed response (per the product
   * spec) before failing with a clean, client-safe error — the client never
   * sees a JSON parse error, an "unexpected format" message, or any raw
   * provider output.
   */
  private async getValidatedPlan(prompt: string, log: Logger) {
    let attempt = 0;
    let lastFailureReason: "provider_error" | "invalid_schema" | null = null;

    while (attempt <= AI_RESPONSE_MAX_RETRIES) {
      attempt += 1;
      try {
        const raw = await this.aiProvider.generateProjectPlan(prompt);
        const result = generatedProjectPlanSchema.safeParse(raw);

        if (result.success) {
          return result.data;
        }

        lastFailureReason = "invalid_schema";
        log.warn({ attempt, issues: result.error.issues.length }, "AI response failed schema validation");
      } catch (err) {
        lastFailureReason = "provider_error";
        log.warn({ attempt, err }, "AI provider call failed");
      }
    }

    log.error({ attempts: attempt, reason: lastFailureReason }, "generation failed after retries");
    throw AppError.generationFailed();
  }
}
