export interface PerformancePrediction {
  successLikelihood: number // 0-100
  tokenEfficiency: number // 0-100
  complexityScore: number // 0-100
  recommendedUseCase: string
  confidenceLevel: 'high' | 'medium' | 'low'
}

export function predictPromptPerformance(
  prompt: string,
  analysisScore: number,
  categoryScores: Record<string, number>
): PerformancePrediction {
  // Success likelihood based on analysis score and key factors
  const successLikelihood = Math.min(100, Math.max(0, 
    analysisScore * 0.8 + 
    (categoryScores.clarityIntent || 0) * 0.1 + 
    (categoryScores.outputFormat || 0) * 0.1
  ))

  // Token efficiency based on prompt length and structure
  const wordCount = prompt.split(/\s+/).length
  const hasStructure = prompt.includes('**') || prompt.includes('__')
  const tokenEfficiency = Math.min(100, Math.max(20,
    100 - (wordCount > 200 ? (wordCount - 200) * 0.2 : 0) +
    (hasStructure ? 15 : 0) +
    (analysisScore > 80 ? 10 : 0)
  ))

  // Complexity assessment
  const complexityScore = Math.min(100, Math.max(0,
    (wordCount / 10) +
    (prompt.split('\n').length * 2) +
    ((categoryScores.instructionsConstraints || 0) * 2)
  ))

  // Recommend use case based on scores
  let recommendedUseCase = 'General purpose tasks'
  if (categoryScores.outputFormat >= 16) recommendedUseCase = 'Structured data generation'
  else if (categoryScores.clarityIntent >= 16) recommendedUseCase = 'Creative and analytical tasks'
  else if (categoryScores.instructionsConstraints >= 16) recommendedUseCase = 'Complex multi-step processes'

  // Confidence level
  let confidenceLevel: 'high' | 'medium' | 'low' = 'medium'
  if (analysisScore >= 85) confidenceLevel = 'high'
  else if (analysisScore <= 60) confidenceLevel = 'low'

  return {
    successLikelihood: Math.round(successLikelihood),
    tokenEfficiency: Math.round(tokenEfficiency),
    complexityScore: Math.round(complexityScore),
    recommendedUseCase,
    confidenceLevel
  }
}
