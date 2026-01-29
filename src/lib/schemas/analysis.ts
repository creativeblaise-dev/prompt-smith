import { z } from 'zod'

// Analysis result schema
export const AnalysisResultSchema = z.object({
  ruleId: z.string(),
  category: z.string(),
  passed: z.boolean(),
  score: z.number(),
  message: z.string(),
  suggestion: z.string().optional(),
})

export const PromptAnalysisSchema = z.object({
  originalPrompt: z.string(),
  overallScore: z.number(),
  categoryScores: z.record(z.string(), z.number()),
  results: z.array(AnalysisResultSchema),
  refinedPrompt: z.string().optional(),
  improvements: z.array(z.string()).optional(),
})

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>
export type PromptAnalysis = z.infer<typeof PromptAnalysisSchema>
