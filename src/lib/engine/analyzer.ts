import { PromptAnalysis, AnalysisResult } from '../schemas/analysis'
import { getAllRules } from '../rules'
import { Rule } from '@/types/rule'

export async function analyzePromptAgainstRules(prompt: string): Promise<PromptAnalysis> {
  const rules = getAllRules()
  const results: AnalysisResult[] = []
  
  // Evaluate each rule
  for (const rule of rules) {
    try {
      const passed = await rule.check(prompt)
      const score = passed ? rule.weight : 0
      
      results.push({
        ruleId: rule.id,
        category: getCategoryDisplayName(rule.category),
        passed,
        score,
        message: passed ? `${rule.name}: ✓` : `${rule.name}: ${rule.description}`,
        suggestion: passed ? undefined : rule.suggestion,
      })
    } catch (error) {
      // If rule check fails, mark as failed
      results.push({
        ruleId: rule.id,
        category: getCategoryDisplayName(rule.category),
        passed: false,
        score: 0,
        message: `${rule.name}: Error evaluating rule`,
        suggestion: rule.suggestion,
      })
    }
  }

  // Calculate scores
  const overallScore = calculateOverallScore(results, rules)
  const categoryScores = calculateCategoryScores(results)

  return {
    originalPrompt: prompt,
    overallScore,
    categoryScores,
    results,
  }
}

function calculateOverallScore(results: AnalysisResult[], rules: readonly Rule[]): number {
  const totalPossible = Array.from(rules).reduce((sum, rule) => sum + rule.weight, 0)
  const actualScore = results.reduce((sum, result) => sum + result.score, 0)
  
  // Convert to 0-100 scale
  return Math.round((actualScore / totalPossible) * 100)
}

function calculateCategoryScores(results: AnalysisResult[]): Record<string, number> {
  const categories = ['Clarity & Intent', 'Context & Inputs', 'Instructions & Constraints', 'Output Format & Verification', 'Safety, Privacy & Robustness']
  const scores: Record<string, number> = {}
  
  for (const category of categories) {
    const categoryResults = results.filter(r => r.category === category)
    if (categoryResults.length > 0) {
      const passed = categoryResults.filter(r => r.passed).length
      scores[category] = Math.round((passed / categoryResults.length) * 100)
    } else {
      scores[category] = 0
    }
  }
  
  return scores
}

function getCategoryDisplayName(category: string): string {
  const mapping: Record<string, string> = {
    'clarity': 'Clarity & Intent',
    'context': 'Context & Inputs', 
    'instructions': 'Instructions & Constraints',
    'format': 'Output Format & Verification',
    'safety': 'Safety, Privacy & Robustness'
  }
  return mapping[category] || category
}
