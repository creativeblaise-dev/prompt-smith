import { RuleCategory, Severity } from './rule';

export type Finding = Readonly<{
  ruleId: string;
  ruleName: string;
  category: RuleCategory;
  severity: Severity;
  message: string;
  suggestion: string;
  passed: boolean;
}>;

export type CategoryScore = Readonly<{
  category: RuleCategory;
  score: number;
  maxScore: number;
  percentage: number;
}>;

export type QualityTier = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

export type AnalysisResult = Readonly<{
  overallScore: number;
  maxScore: number;
  percentage: number;
  tier: QualityTier;
  categoryScores: readonly CategoryScore[];
  findings: readonly Finding[];
  prompt: string;
  analyzedAt: Date;
}>;

// Functional helpers
export type AnalysisResultBuilder = {
  withScore: (score: number, maxScore: number) => AnalysisResultBuilder;
  withFindings: (findings: readonly Finding[]) => AnalysisResultBuilder;
  withCategoryScores: (scores: readonly CategoryScore[]) => AnalysisResultBuilder;
  build: (prompt: string) => AnalysisResult;
};
