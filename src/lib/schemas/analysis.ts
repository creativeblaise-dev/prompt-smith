import { z } from 'zod';

export const SeveritySchema = z.enum(['high', 'medium', 'low']);
export const RuleCategorySchema = z.enum(['clarity', 'context', 'instructions', 'format', 'safety']);
export const QualityTierSchema = z.enum(['excellent', 'good', 'fair', 'poor', 'critical']);

export const FindingSchema = z.object({
  ruleId: z.string(),
  ruleName: z.string(),
  category: RuleCategorySchema,
  severity: SeveritySchema,
  message: z.string(),
  suggestion: z.string(),
  passed: z.boolean(),
});

export const CategoryScoreSchema = z.object({
  category: RuleCategorySchema,
  score: z.number().min(0),
  maxScore: z.number().min(0),
  percentage: z.number().min(0).max(100),
});

export const AnalysisResultSchema = z.object({
  overallScore: z.number().min(0),
  maxScore: z.number().min(0),
  percentage: z.number().min(0).max(100),
  tier: QualityTierSchema,
  categoryScores: z.array(CategoryScoreSchema),
  findings: z.array(FindingSchema),
  prompt: z.string(),
  analyzedAt: z.date(),
});
