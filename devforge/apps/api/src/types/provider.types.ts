/**
 * Contract every AI provider must satisfy. Business logic (GenerateService)
 * depends only on this interface, never on a concrete provider — swapping
 * Gemini for OpenAI or Groq later means writing one new class, nothing else
 * changes.
 */
export interface AIProvider {
  /**
   * Given a natural-language prompt, returns the raw parsed JSON the model
   * produced. The caller is responsible for schema validation — a provider
   * only guarantees it returns *parsed* JSON, not that the JSON matches the
   * expected project-plan shape.
   */
  generateProjectPlan(prompt: string): Promise<unknown>;
}
